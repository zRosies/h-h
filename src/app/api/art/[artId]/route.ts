import { NextResponse } from "next/server";

import { getArtById } from "../../controllers/controllers";

export async function GET(req: Request, context: any) {
  const { params } = context;

  const data: any = await getArtById(params.artId);

  if (data.length <= 0) {
    return NextResponse.json({ message: "No data found with this Id" });
  }
  return NextResponse.json({ data });
}
