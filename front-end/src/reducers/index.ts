import { combineReducers } from "redux";
import { User, Action, Restaurant } from "../models";
import cookieHandler from "../models/userCookies";

const user = (user: User | null = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      cookieHandler.storeUser(action.payload.id);
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

const rootReducer = combineReducers({ user, restaurants });

export interface ReduxState {
  user: User | null;
  restaurants: Restaurant[];
}

export default rootReducer;
