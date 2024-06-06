import { IronSession, SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  userId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  isAdmin?: boolean;
  cartId?: number;
  wishlistId?: number;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  userId: undefined,
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  isAdmin: undefined,
  cartId: undefined,
  wishlistId: undefined,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY as string,
  cookieName: "bybee-boutique",
  cookieOptions: {
    httpOnly: true,
    secure: (process.env.NODE_ENV as string) === "production",
  },
};

export type ExtendedSession = IronSession<SessionData>;
