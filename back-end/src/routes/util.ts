import fetch from "node-fetch";

export const yelpApiQuery = (latitude: string, longitude: string) => {
  const urlString =
    "https://api.yelp.com/v3/businesses/search?" +
    new URLSearchParams({
      latitude,
      longitude,
    });
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