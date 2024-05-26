import { authenticate } from "@/services/authenticate";
import { NextResponse } from "next/server";

interface data {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const result = await authenticate(data);
  return NextResponse.json(result);
}
