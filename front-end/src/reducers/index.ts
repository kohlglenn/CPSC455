import { combineReducers } from "redux";
import cookieHandler from "../models/userCookies";
import { User, Action, Restaurant, Lobby } from "../models";
import sampleLobbyData from '../SampleLobbyData.json';

const user = (user: User | null = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      if (action.payload != null)
        cookieHandler.storeUser(action.payload._id.toString());
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

const lobbies = (lobbies: Lobby[] = [], action: Action) => {
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
