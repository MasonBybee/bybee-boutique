import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  isAdmin: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY as string,
  cookieName: "bybee-boutique",
  cookieOptions: {
    httpOnly: true,
    secure: (process.env.NODE_ENV as string) === "production",
  },
};
