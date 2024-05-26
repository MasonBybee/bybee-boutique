import db from "@/db/db";
import { inventory } from "@/schema/Inventory";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  name: string;
  description: string;
  stock: number;
  unitPrice: string;
  categoryId: number;
}

export async function GET() {
  const response = await db.select().from(inventory);

  return NextResponse.json(response[0]);
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const response = await db.insert(inventory).values(data).returning();

  return NextResponse.json(response[0]);
}
