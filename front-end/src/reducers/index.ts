import { combineReducers } from "redux";
import { User, Action } from "../models";

const user = (user: User | null = null, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return user;
  }
};

const rootReducer = combineReducers({ user });

export interface ReduxState {
  user: User;
}

export default rootReducer;
