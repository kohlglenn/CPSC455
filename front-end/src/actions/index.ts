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

export const setLobby = (lobby: Lobby) => {
  return {
    type: "SET_LOBBY",
    payload: lobby,
  };
};

export const addLobby = (lobby: Lobby) => {
  return {
    type: "ADD_LOBBY",
    payload: lobby,
  }
}
