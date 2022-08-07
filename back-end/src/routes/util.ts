import fetch from "node-fetch";
import { Filters, Lobby, User } from "../models";

const queries = require('../db/mongodb').queries;
const priceLevelHelper = (low: number, high: number) => {
  console.log(low);
  console.log(high);
  if (low <= high) {
    let str = `${low}`;
    low += 1;
    while (low <= high) {
      str += `,${low}`;
      low += 1;
      console.log(str);
    }
    return str;
  } else {
    return `${low}`;
  }
};

export const yelpApiQuery = (latitude: string, longitude: string, filters: Filters) => {
  const radius = String(filters.distanceHigh * 1000); // km to m
  const price = priceLevelHelper(filters.priceLow, filters.priceHigh);
  const urlString =
    "https://api.yelp.com/v3/businesses/search?" +
    new URLSearchParams({
      latitude,
      longitude,
      radius,
      price
    });
  console.log(urlString);
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.YELP_AUTH_KEY || "",
    },
  };
  return fetch(urlString, options);
};

export const createToken = () => {
  const str1 = Math.random().toString(36).substring(2);
  const str2 = Math.random().toString(36).substring(2);
  return str1 + str2;
};

export const calculateBestRestaurant = (lobby: Lobby) => {
  if (lobby.votes.length === lobby.participants.length * lobby.restaurants.length) {
    const scores = lobby.votes.reduce((standings, vote) => {
      const index = standings.findIndex(s => s.id === vote.restaurant_id);
      switch (vote.vote){
        case 'yes':
          standings[index].score += 1;
          break;
        case 'no':
        default:
          break;
      }
      return standings;
    }, lobby.restaurants.map(r => {
      return {id: r.id, score: 0};
    }));
    const winner = scores.sort((a,b) => b.score - a.score)[0].id;
    updatePreferences(lobby);
    return lobby.restaurants.find(r => r.id === winner);
  };
  return undefined;
};

export const stripUser = (user: any)=>{
  const newUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    upvotes: user.upvotes,
    downvotes: user.downvotes,
    restaurantHistory: user.restaurantHistory,
    token: user.token,
  }
  return newUser;
}

const updatePreferences = async (lobby: Lobby)=>{
  const restaurants = new Map();
  const users = new Map();

  lobby.restaurants.forEach(restaurant =>{
    restaurants.set(restaurant.id, restaurant);
  });

  await Promise.all(lobby.participants.map(async (participant) => {
    const user = await queries.getUser(participant._id);
    users.set(participant._id, user);
  }));

  lobby.votes.forEach(vote =>{
    const restaurant = restaurants.get(vote.restaurant_id);
    const user = users.get(vote.user_id);
    restaurant.categories.forEach((category: { title: any; }) =>{
      let userMap = (vote.vote === "yes") ? user.upvotes : user.downvotes;
      userMap.set(category.title, (userMap.get(category.title) || 0) + 1 );
    })
  })
  users.forEach((user, id)=>{
    user.save();
  })

}