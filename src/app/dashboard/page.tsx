import styles from "@/app/dashboard/styles.module.scss";
import DashboardHeader from "../components/dashboard/DashboardHeader";
// import { getSession } from "next-auth/react";
import { ServerComponent } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ProductList } from "../components/product/productList";
import { getUsersById } from "../api/controllers/controllers";

export const metadata: Metadata = {
  title: "Profile | Handcrafted Haven",
  description: "Handcrafted Haven website, delight with your awesome art",
};

export default async function Dashboard() {
  const session: any = await ServerComponent();
  if (session == null) {
    redirect("/");
  }

  //erro aqui
  const userData: any = await getUsersById(session.user.sellerId);

  return (
    <>
      <section className="lg:mx-20 mx-1">
        <div className={styles.container}>
          <DashboardHeader userInfo={userData[0]} />
        </div>
        <div className="">
          <h3 className="font-semibold border-b-2 border-gray-500 my-2 w-[100px] mx-5">
            My products
          </h3>
          <ProductList userId={session.user.sellerId} />
        </div>
      </section>
    </>
  );
}
