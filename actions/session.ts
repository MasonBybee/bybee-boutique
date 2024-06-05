"use server";
import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { User, users } from "@/lib/schema/User";
import {
  sessionOptions,
  SessionData,
  defaultSession,
  ExtendedSession,
} from "@/lib/session";
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
    };
  }
};

export const login = async (formData: FormData) => {
  try {
    const session = (await getSession()) as ExtendedSession;

    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;
    const user: User | undefined = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, formUsername),
    });

    if (user && (await bcrypt.compare(formPassword, user.password))) {
      session.userId = user.id;
      session.username = user.username;
      session.firstName = user.firstName;
      session.lastName = user.lastName;
      session.isAdmin = user.admin;
      session.isLoggedIn = true;
      await session.save();
      redirect("/");
    } else {
      throw new CustomError(401, "Invalid username or password");
    }
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    } else {
      throw new CustomError(500, "Internal Server Error");
    }
  }
};

export const logout = async () => {
  const session = (await getSession()) as ExtendedSession;
  session.destroy();
  redirect("/");
};

export async function signup(formData: FormData) {
  try {
    const session = (await getSession()) as ExtendedSession;
    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;
    const formFirstName = formData.get("firstName") as string;
    const formLastName = formData.get("lastName") as string;
    const formEmail = formData.get("email") as string;
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
    if (result) {
      session.userId = result[0].id;
      session.username = formUsername;
      session.firstName = formFirstName;
      session.lastName = formLastName;
      session.isLoggedIn = true;
    }
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    } else {
      throw new CustomError(500, "Internal Server Error");
    }
  }
}
