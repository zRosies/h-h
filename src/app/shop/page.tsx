import { Metadata } from "next";
import ShopProdc from "../components/shop/shop";
export const metadata: Metadata = {
  title: "Shop | Handcrafted Haven",
  description: "Handcrafted Haven website, see our amazing art!",
};

export default function Shop() {
  return (
    <>
      <ShopProdc />
    </>
  );
}
