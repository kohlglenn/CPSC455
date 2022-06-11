import { Action as ReduxAction } from "redux";

export type Action = ReduxAction & { payload: any };

export interface User {
  name: string;
  email: string;
  profileUrl?: string;
}

export interface Restaurant {
  name: string;
  open_now: boolean;
  photos: string[];
  price_level: number | undefined;
  rating: number;
  user_ratings_total: number;
  location: { lat: number; long: number };
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
