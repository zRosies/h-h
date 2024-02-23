import { ServerComponent } from "@/app/api/auth/[...nextauth]/options";
import { getArtById, getUsersById } from "@/app/api/controllers/controllers";
import CustomerReviews from "@/app/components/customerReviews/customerReviews";
import PurchaseCard from "@/app/components/product/purchaseCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product | Handcrafted Haven",
  description:
    "Handcrafted Haven website, buy awesome arts handcrafted maden by our crafters",
};

export interface UserInfo {
  email: string;
  id: string;
  userInfo: Info;
}

export interface Info {
  first_name: string;
  last_name: string;
  image: string;
  level: string;
  description: string;
}

export default async function ProductPage(context: any) {
  const { params } = context;
  const artId = params.artId;
  const data: any = await getArtById(artId);

  const user = await ServerComponent();
  let userInfo: any;
  if (user) {
    const data = await getUsersById(user.user.sellerId);
    userInfo = data;
  } else {
    userInfo = [];
  }

  return (
    <>
      <PurchaseCard data={data[0]} user={userInfo[0]} artId={artId} />
    </>
  );
}
