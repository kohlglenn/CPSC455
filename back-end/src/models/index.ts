// Keep in sync with front-end/src/model/index
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
  rating: number;
  user_ratings_total: number;
  location: { latitude: number; longitude: number };
}

export interface Lobby {
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

export interface Filters {
  numberRestaurants: number;
  distanceLow: number; // remove?
  ratingLow: number;
  priceLow: number;
  reviewCountLow: number;
  distanceHigh: number;
  ratingHigh: number;
  priceHigh: number;
  reviewCountHigh: number; // remove?
};

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