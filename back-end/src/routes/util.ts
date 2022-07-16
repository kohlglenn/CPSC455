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
