import { ObjectHTMLAttributes } from "react";
import { Restaurant, RestaurantQuery, Vote, VoteResult } from ".";
import userCookies from "./userCookies";

//change stuff to use .env instead of hardcode address
export const getUserAsync = async () => {
  const userid = userCookies.getUser();
  const url =
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}` +
    "/users/" +
    userid;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const userLoginAsync = async (info: Object) => {
  const url =
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}` +
    "/users/login";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

export const userCreateAsync = async (info: Object) => {
  const url =
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}` +
    "/users/createuser";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

export const getLobbyAsync = async (id: String) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}/lobby/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export const addLobbyAsync = async (lobby: Object) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}/lobby`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lobby),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export const addLobbyUsersAsync = async (user: Object) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}/lobby/addUser`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export const updateFiltersAsync = async (filters: Object) => {
  const response = await fetch(
    `${
      process.env.REACT_APP_BACKEND || "http://localhost:5000"
    }/lobby/updateLobby`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export const setRestaurantsAsync = async (
  restaurants: Restaurant[],
  lobbyId: string | undefined
) => {
  if (!lobbyId) {
    alert("Error finding lobby ID.");
    return;
  }
  const response = await fetch(
    `${
      process.env.REACT_APP_BACKEND || "http://localhost:5000"
    }/lobby/restaurants`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: lobbyId, restaurants: restaurants }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export const getRestaurantsAsync = async (query: RestaurantQuery) => {
  const url =
    (process.env.REACT_APP_BACKEND || "http://localhost:5000") +
    "/restaurants/?" +
    new URLSearchParams({
      latitude: String(query.latitude),
      longitude: String(query.longitude),
      filters: JSON.stringify(query.filters),
    });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    return Promise.reject(errorMsg);
  }

  return Promise.resolve(data);
};

export const addVoteAsync = async (lobbyId: string, vote: Vote) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND || "http://localhost:5000"}/lobby/vote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: lobbyId, vote }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    return Promise.reject(errorMsg);
  }

  return Promise.resolve(data);
};
