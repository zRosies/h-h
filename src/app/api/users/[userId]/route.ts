import { NextResponse } from "next/server";
import {
  getUsersById,
  postUserInformation,
} from "../../controllers/controllers";
import { initClientDB } from "../../mongo/connection";

export async function GET(req: Request, context: any) {
  const { params } = context;
  const data: any = await getUsersById(params.userId);

  if (data.length <= 0) {
    return NextResponse.json({ message: "No data found with this Id" });
  }
  return NextResponse.json({ data });
}

export async function PUT(req: Request, context: any) {
  const { params } = context;
  const body = await req.json();
  const data: any = await postUserInformation(params.userId, body);

  if (data.length <= 0) {
    return NextResponse.json({ message: "No data found with this Id" });
  }
  if (data.acknowledged) {
    return NextResponse.json({ message: "Data updated successfully" });
  }
  return NextResponse.json({ data });
}
