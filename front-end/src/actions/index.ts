import { User, Restaurant, Lobby } from "../models";

export const setUser = (user: User | null) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};


export const setRestaurants = (restaurants: Restaurant[]) => {
  return {
    type: "SET_RESTAUARANTS",
    payload: restaurants,
  };
};

export const setLobbies = (lobbies: Lobby[]) => {
  return {
    type: "SET_LOBBIES",
    payload: lobbies,
  };
};
