import { NextResponse } from "next/server";
import { updateReview } from "../../controllers/controllers";

export async function PUT(req: Request, context: any) {
  const { params } = context;
  const reviewAdded = await req.json();

  const newReviews = {
    $push: {
      reviews: {
        $each: [reviewAdded],
      },
    },
  };

  const response: any = await updateReview(params.sellerId, newReviews);
  if (response.modifiedCount <= 0) {
    return NextResponse.json({ message: "The review was not added" });
  }

  return NextResponse.json({ message: "The review was sucessfuly added!" });
}
