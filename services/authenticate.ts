import db from "@/db/db";
import { users } from "@/schema/User";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import CustomError from "./CustomError";

interface data {
  username: string;
  password: string;
}

export async function authenticate(data: data) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, data.username));
    if (user.length === 0) {
      throw new CustomError(401, "Invalid username or password");
    }
    if (user) {
      const is_auth = await bcrypt.compare(data.password, user[0].password);
      if (is_auth) {
        const { password, ...newUser } = user[0];
        return newUser;
      } else {
        throw new CustomError(401, "Invalid username or password");
      }
    }
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    } else {
      throw new CustomError(500, "Internal Server Error");
    }
  }
}
