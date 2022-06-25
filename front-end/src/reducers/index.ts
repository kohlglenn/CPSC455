import { combineReducers } from "redux";
import { User, Action, Restaurant, Lobby } from "../models";
import sampleLobbyData from '../SampleLobbyData.json';

const user = (user: User | null = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return user;
  }
};

const restaurants = (restaurants: Restaurant[] = [], action: Action) => {
  switch (action.type) {
    case "SET_RESTAUARANTS":
      return [...action.payload];
    default:
      return restaurants;
  }
};

const lobbies = (lobbies: Lobby[] = sampleLobbyData.lobbies, action: Action) => {
  switch (action.type) {
    case "SET_LOBBIES":
      return [...action.payload];
    default:
      return lobbies;
  }
}

const rootReducer = combineReducers({ user, restaurants, lobbies });

export interface ReduxState {
  user: User | null;
  restaurants: Restaurant[];
  lobbies: Lobby[];
}

export default rootReducer;
