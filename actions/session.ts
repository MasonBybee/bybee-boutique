"use server";
import db from "@/lib/db/db";
import { carts } from "@/lib/schema/Cart";
import { users } from "@/lib/schema/User";
import { wishlists } from "@/lib/schema/Wishlist";
import {
  sessionOptions,
  SessionData,
  defaultSession,
  ExtendedSession,
} from "@/lib/session";
import {
  FormResponse,
  LoginFormValues,
  ProfileValues,
  SignUpFormValues,
  UpdatePassword,
} from "@/lib/types";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  signUpFormValidator,
  updatePasswordValidator,
  updateProfileValidator,
} from "./formValidation";
import { eq } from "drizzle-orm";

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
      email: session.email,
      isAdmin: session.isAdmin,
      isLoggedIn: session.isLoggedIn,
      cartId: session.cartId,
      wishlistId: session.wishlistId,
    };
  }
};

export const login = async (
  formData: LoginFormValues
): Promise<FormResponse> => {
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
      session.email = user.email;
      session.firstName = user.firstName;
      session.lastName = user.lastName;
      session.isAdmin = user.admin;
      session.isLoggedIn = true;
      session.cartId = cartId;
      session.wishlistId = wishlistId;
      await session.save();
      return { success: true };
    } else {
      return {
        success: false,
        errors: { submit: "Invalid username or password" },
      };
    }
  } catch (e) {
    return {
      success: false,
      errors: { submit: "Internal Server Error" },
    };
  }
};

export const logout = async () => {
  const session = (await getSession()) as ExtendedSession;
  session.destroy();
};

export async function signup(
  formData: SignUpFormValues
): Promise<FormResponse> {
  try {
    const errors = signUpFormValidator(formData);
    if (Object.keys(errors).length) {
      return { success: false, errors: errors };
    }
    const session = (await getSession()) as ExtendedSession;

    const hashedPassword: string = await bcrypt.hash(formData.password, 12);
    const newUser = {
      username: formData.username,
      password: hashedPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    const result = await db
      .insert(users)
      .values(newUser)
      .returning({ id: users.id });
    if (result) {
      const wishlistId = await db
        .insert(wishlists)
        .values({ userId: result[0].id })
        .returning({ wishlistId: wishlists.id });

      const cartId = await db
        .insert(carts)
        .values({ userId: result[0].id })
        .returning({ cartId: carts.id });

      session.userId = result[0].id;
      session.username = formData.username;
      session.email = formData.email;
      session.firstName = formData.firstName;
      session.lastName = formData.lastName;
      session.isLoggedIn = true;
      session.wishlistId = Number(wishlistId[0].wishlistId);
      session.cartId = Number(cartId[0].cartId);
      session.save();
      return { success: true };
    }
    return {
      success: false,
      errors: { submit: "Internal Server Error" },
    };
  } catch (e: any) {
    if (e.code === "23505") {
      return {
        success: false,
        errors: { submit: "Username taken please try again" },
      };
    }
    return {
      success: false,
      errors: { submit: e.message },
    };
  }
}

export const updateProfileSession = async (
  profileValues: ProfileValues
): Promise<FormResponse> => {
  try {
    const errors = updateProfileValidator(profileValues);
    if (Object.keys(errors).length) {
      return { success: false, errors: errors };
    }
    const session = await getSession();
    const updateResult = await db
      .update(users)
      .set({
        firstName: profileValues.firstName,
        lastName: profileValues.lastName,
        email: profileValues.email,
      })
      .where(eq(users.username, session.username))
      .returning({ id: users.id });
    if (!updateResult[0].id) {
      return { success: false, errors: { submit: "Profile not updated" } };
    }
    session.firstName = profileValues.firstName;
    session.lastName = profileValues.lastName;
    session.email = profileValues.email;
    await session.save();
    return { success: true };
  } catch (e: any) {
    console.error("Failed to update session:", e);
    return {
      success: false,
      errors: { submit: e.message || "Failed to update profile" },
    };
  }
};

export const updatePassword = async (formData: UpdatePassword) => {
  const errors = updatePasswordValidator(formData);
  if (Object.keys(errors).length) {
    return { success: false, errors: errors };
  }
  const session = await getSession();
  const hashedPassword: string = await bcrypt.hash(formData.password, 12);
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.username, session.username));
  return { success: true };
};
