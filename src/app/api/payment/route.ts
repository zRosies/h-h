import { NextResponse } from "next/server";
import { initPaymentDB } from "../mongo/connection";

export async function POST(req: Request, res: Response) {
  const db = await initPaymentDB();

  const body = await req.json();

  try {
    const response: any = await db.insertOne(body);
    if (response.insertedCount <= 0) {
      return NextResponse.json({ message: "Payment was not added!" });
    }
    return NextResponse.json({ message: "Payment added successfuly!" });
  } catch (error: any) {
    console.log(error.message);
  }
}
