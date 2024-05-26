import db from "@/db/db";
import { users } from "@/schema/User";
import bcrypt from "bcrypt";
import CustomError from "./CustomError";

interface data {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  admin: boolean;
}
export async function signup(data: data) {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const newUser = { ...data, password: hashedPassword };
  try {
    const result = await db.insert(users).values(newUser).returning();
    return result[0];
  } catch (e: any) {
    if (e instanceof CustomError) {
      return e;
    } else if (e.code === "23505") {
      return new CustomError(409, "Username Already Exists");
    } else {
      return e;
    }
  }
}
