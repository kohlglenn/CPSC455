import { combineReducers } from "redux";
import cookieHandler from "../models/userCookies";
import { User, Action, Restaurant, Lobby } from "../models";

const user = (user: User | null = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      if (action.payload != null)
        cookieHandler.storeUser(action.payload._id.toString());
        user = action.payload;
      return user;
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

const lobby = (lobby: Lobby | null = null, action: Action) => {
  switch (action.type) {
    case "SET_LOBBY":
      return action.payload;
    default:
      return lobby;
  }
};

const rootReducer = combineReducers({ user, restaurants, lobby });

export interface ReduxState {
  user: User;
  restaurants: Restaurant[];
  lobby: Lobby;
}

export default rootReducer;
