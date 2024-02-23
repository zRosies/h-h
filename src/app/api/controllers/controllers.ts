import { ObjectId } from "mongodb";
import { initClientDB, initDb } from "../mongo/connection";
import User from "../schemas/user";
import { PostReview } from "@/app/components/product/reviewForm";

export async function getAllProducts() {
  try {
    const data = await initDb();
    // const data = await initDb();
    const arts = await data.find().toArray();
    return arts;
  } catch (error) {
    return { error: `${error} failed to fetch arts` };
  }
}

//Gets the seller products
export async function getProductsById(sellerId: any) {
  try {
    const data = await initDb();
    const arts = await data.find({ sellerId: sellerId }).toArray();
    return arts;
  } catch (error) {
    return { error: `${error}failed to fetch arts` };
  }
}

//Gets only one product based on its _id

export async function getArtById(artId: any) {
  try {
    const data = await initDb();
    const arts = await data.find({ _id: new ObjectId(artId) }).toArray();
    return arts;
  } catch (error) {
    return { error: `${error}failed to fetch art` };
  }
}

export async function postArtProduct(body: any) {
  try {
    const data = await initDb();
    const result = await data.insertOne(body);
    return result;
  } catch (err) {
    return err;
  }
}

export async function deleteProductsById(id: any) {
  try {
    const data = await initDb();
    const response = await data.deleteOne({ _id: new ObjectId(`${id}`) });

    return response;
  } catch (error) {
    return error;
  }
}

export async function updateProductsById(id: any, body: any) {
  try {
    const data = await initDb();
    const response = await data.replaceOne(
      { _id: new ObjectId(`${id}`) },
      body
    );

    return response;
  } catch (error) {
    return { message: error };
  }
}

// export async function updateReview(id: any, review: any) {
//   try {
//     const data = await initDb();
//     const response = data.updateOne({ _id: new ObjectId(id) }, review);
//     return response;
//   } catch (error) {
//     return { message: error };
//   }
// }

export async function updateReview(id: any, review: any) {
  try {
    //----------- This part simply adds the review to the database
    const data = await initDb();
    await data.updateOne({ _id: new ObjectId(id) }, review);

    //-------------This part updates the product rating by getting the total rate and diving by its length--------
    const productInfo: any = await data.findOne({ _id: new ObjectId(id) });
    const reviews = productInfo.reviews;

    let reviewRate: number = 0;
    reviews.forEach((review: PostReview) => {
      reviewRate += review.rating;
    });

    const newReviewRate: number = reviewRate / reviews.length;
    const updated = await data.updateOne(
      { _id: new ObjectId(id) },
      { $set: { rating: newReviewRate } }
    );

    // ----------------------------------------------------------------------------------------------------------

    return updated;
  } catch (error) {
    return { message: error };
  }
}

export async function insertCredentialsInMongo({
  user,
  account,
}: {
  user: any;
  account: any;
}) {
  const db = await initClientDB();

  try {
    const existingUser = await db.findOne({ email: user.email });

    if (!existingUser) {
      const newUser = new User({
        email: user.email,
        id: user.id,
      });

      await db.insertOne(newUser);
      return true;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function getUsersById(userId: any) {
  try {
    const data = await initClientDB();
    const arts = await data.find({ id: userId }).toArray();
    return arts;
  } catch (error) {
    return { error: `${error}failed to fetch arts` };
  }
}

export async function postUserInformation(userId: any, body: any) {
  try {
    const data = await initClientDB();

    const result = await data.updateOne(
      { id: userId },
      { $set: { userInfo: body } }
    );

    return result;
  } catch (err) {
    return err;
  }
}
