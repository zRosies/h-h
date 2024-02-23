import { NextResponse } from "next/server";
import { getAllProducts, postArtProduct } from "../controllers/controllers";

export async function GET() {
  const response: any = await getAllProducts();

  if (response.length <= 0) {
    return NextResponse.json({ message: "No items found in the database" });
  }
  return NextResponse.json({ response });
}

export async function POST(req: Request, context: any) {
  const body = await req.json();

  const response: any = await postArtProduct(body);
  if (response.acknowledged) {
    return NextResponse.json({
      message: `Product added to the database ${response.insertedId}`,
    });
  } else {
    return NextResponse.json({ error: response.err });
  }
}
