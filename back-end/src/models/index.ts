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
