import db from "@/db/db";
import { users } from "@/schema/User";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  firstName: string;
  lastName: string;
  email: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const user = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      username: users.username,
      email: users.email,
      admin: users.admin,
    })
    .from(users)
    .where(eq(users.id, Number(params.userId)));

  return NextResponse.json(user[0]);
}

export async function PATCH(request: Request, context: any) {
  const data: data = await request.json();
  const { params } = context;
  await db
    .update(users)
    .set(data)
    .where(eq(users.id, params.userId))
    .returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      username: users.username,
      email: users.email,
      admin: users.admin,
    });
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;
  await db
    .delete(users)
    .where(eq(users.id, Number(params.userId)))
    .returning({ deletedId: users.id });
}
