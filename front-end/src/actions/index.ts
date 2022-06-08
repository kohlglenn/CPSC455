import { User } from "../models";

export const setUser = (user: User | null) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
