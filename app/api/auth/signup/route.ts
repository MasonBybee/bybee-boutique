import { signup } from "@/services/signup";
import { NextResponse } from "next/server";

interface data {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  admin: boolean;
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const result = await signup(data);
  return NextResponse.json(result);
}
