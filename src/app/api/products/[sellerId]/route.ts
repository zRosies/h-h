import { NextRequest, NextResponse } from "next/server";
import {
  deleteProductsById,
  getProductsById,
  updateProductsById,
} from "../../controllers/controllers";

export async function GET(req: Request, context: any) {
  const { params } = context;
  const data: any = await getProductsById(params.sellerId);

  if (data.length <= 0) {
    return NextResponse.json({ message: "No data found with this Id" });
  }
  return NextResponse.json({ data });
}

export async function DELETE(req: Request, context: any) {
  const { params } = context;

  const response: any = await deleteProductsById(params.sellerId);
  if (response.deletedCount <= 0) {
    return NextResponse.json({
      message: "Item was not deleted from the database",
    });
  }

  return NextResponse.json({ message: "Item deleted successfuly" });
}

export async function PUT(req: Request, context: any) {
  const { params } = context;
  const body = await req.json();

  const response: any = await updateProductsById(params.sellerId, body);

  if (response.modifiedCount <= 0) {
    return NextResponse.json({ message: "Item was not updated!" });
  }

  return NextResponse.json({ response });
}
