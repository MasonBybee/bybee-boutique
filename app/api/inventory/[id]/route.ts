import db from "@/db/db";
import { inventory } from "@/schema/Inventory";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  name?: string;
  description?: string;
  stock?: number;
  unitPrice?: string;
  categoryId?: number;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db.query.inventory.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, params.id),
  });

  return NextResponse.json(response);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(inventory)
    .set(data)
    .where(eq(inventory.id, params.id));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .delete(inventory)
    .where(eq(inventory.id, params.id))
    .returning({ deletedId: inventory.id });
  return NextResponse.json(response[0]);
}
