import { Action as ReduxAction } from "redux";

export type Action = ReduxAction & { payload: any };

export interface User {
  _id: string;
  name: string;
  email: string;
  profileUrl?: string;
}

export interface Restaurant {
  id: string; // yelp id
  name: string;
  photos: string[];
  price_level?: string;
  categories: {alias:string, title:string}[],
  rating: number;
  user_ratings_total: number;
  location: { latitude: number; longitude: number };
}

// https://www.yelp.com/developers/documentation/v3/business_search
export interface YelpBusinessSearchResponse {
  id: string;
  categories: { alias: string; title: string }[];
  coordinates: { latitude: number; longitude: number };
  distance: number; // meters
  image_url: string;
  is_closed: boolean; // permanently closed
  location: {
    display_address: string[]; // Array of strings that if organized vertically give an address that is in the standard address format for the business's country.
  };
  name: string;
  phone: string;
  price?: string;
  rating: number;
  review_count: number;
}

export interface Lobby {
  winner?: Restaurant;
  id: string;
  participants: User[];
  host: User;
  numberRestaurants: number;
  rating: number[];
  distance: number[];
  price: number[];
  reviewCount: number[];
  restaurants: Restaurant[];
  votes: Vote[];
}

export type VoteResult = "yes" | "no";

export interface Vote {
  user_id: string;
  restaurant_id: string;
  vote: VoteResult;
}

export interface GoogleNearbyPlaceResponse {
  name: string;
  geometry: { location: any };
  opening_hours: { open_now: any };
  photos: { height: number; width: number; photo_reference: string }[];
  price_level?: number;
  rating: number;
  user_ratings_total: number;
}

export interface Filters {
  numberRestaurants: number;
  distanceLow: number;
  ratingLow: number;
  priceLow: number;
  reviewCountLow: number;
  distanceHigh: number;
  ratingHigh: number;
  priceHigh: number;
  reviewCountHigh: number;
};

export interface RestaurantQuery {
  latitude: number;
  longitude: number;
  filters: Filters;
};
