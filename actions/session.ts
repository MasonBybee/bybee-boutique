"use server";
import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { carts } from "@/lib/schema/Cart";
import { User, users } from "@/lib/schema/User";
import { wishlists } from "@/lib/schema/Wishlist";
import {
  sessionOptions,
  SessionData,
  defaultSession,
  ExtendedSession,
} from "@/lib/session";
import { LoginFormValues, SignUpFormValues } from "@/lib/types";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async (
  plain = false
): Promise<ExtendedSession | { [key: string]: any }> => {
  const session = (await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  )) as ExtendedSession;

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  if (!plain) {
    return session;
  } else {
    return {
      userId: session.userId,
      firstName: session.firstName,
      lastName: session.lastName,
      username: session.username,
      isAdmin: session.isAdmin,
      isLoggedIn: session.isLoggedIn,
      cartId: session.cartId,
      wishlistId: session.wishlistId,
    };
  }
};

export const login = async (formData: LoginFormValues) => {
  console.log("form data:", formData);
  try {
    const session = (await getSession()) as ExtendedSession;

    const formUsername = formData.username;
    const formPassword = formData.password;
    const user = await db.query.users.findFirst({
      with: { cart: true, wishlist: true },
      where: (users, { eq }) => eq(users.username, formUsername),
    });

    if (user && (await bcrypt.compare(formPassword, user.password))) {
      let cartId = user.cart.id;
      let wishlistId = user.wishlist.id;
      if (!cartId) {
        const id = await db
          .insert(carts)
          .values({ userId: user.id })
          .returning({ cartId: carts.id });
        cartId = id[0].cartId;
      }
      if (!wishlistId) {
        const id = await db
          .insert(wishlists)
          .values({ userId: user.id })
          .returning({ wishlistId: wishlists.id });
        wishlistId = id[0].wishlistId;
      }
      session.userId = user.id;
      session.username = user.username;
      session.firstName = user.firstName;
      session.lastName = user.lastName;
      session.isAdmin = user.admin;
      session.isLoggedIn = true;
      session.cartId = cartId;
      session.wishlistId = wishlistId;
      await session.save();
      redirect("/");
    }
  } catch (e) {
    return e;
  }
};

export const logout = async () => {
  const session = (await getSession()) as ExtendedSession;
  session.destroy();
  redirect("/");
};

export async function signup(formData: SignUpFormValues) {
  try {
    const session = (await getSession()) as ExtendedSession;
    const formUsername = formData.username;
    const formPassword = formData.password;
    const formCheckPassword = formData.checkPassword;
    const formFirstName = formData.firstName;
    const formLastName = formData.lastName;
    const formEmail = formData.email;
    if (formCheckPassword !== formPassword) {
      throw new CustomError(401, "Passwords Must Match");
    }
    const hashedPassword: string = await bcrypt.hash(formPassword, 12);
    const newUser = {
      username: formUsername,
      password: hashedPassword,
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
    };
    const result = await db
      .insert(users)
      .values(newUser)
      .onConflictDoNothing()
      .returning({ id: users.id });
    const wishlistId = await db
      .insert(wishlists)
      .values({ userId: result[0].id })
      .returning({ wishlistId: wishlists.id });
    const cartId = await db
      .insert(carts)
      .values({ userId: result[0].id })
      .returning({ cartId: carts.id });
    if (result) {
      session.userId = result[0].id;
      session.username = formUsername;
      session.firstName = formFirstName;
      session.lastName = formLastName;
      session.isLoggedIn = true;
      session.wishlistId = Number(wishlistId[0].wishlistId);
      session.cartId = Number(cartId[0].cartId);
      session.save();
      redirect("/");
    }
  } catch (e) {
    return e;
  }
}

export const testFunc = async (data: SignUpFormValues) => {
  return;
};
