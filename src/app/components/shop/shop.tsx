"use server";

import { getAllProducts } from "@/app/api/controllers/controllers";
import { RenderProducts } from "./renderProducts";

export default async function ShopProdc() {
  const products: any = await getAllProducts();

  return (
    <>
      <RenderProducts products={products} />
    </>
  );
}
