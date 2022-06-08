import { Action as ReduxAction } from "redux";

export interface User {
  name: string;
  email: string;
  profileUrl?: string;
}

export type Action = ReduxAction & { payload: any };
