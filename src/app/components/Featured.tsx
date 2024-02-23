"use server";
import Link from "next/link";
import { getAllProducts } from "../api/controllers/controllers";
import ProductCard, { Product } from "./product/productCard";

import { FaArrowRightLong } from "react-icons/fa6";
// import { PostProduct } from "./SaveOrUpdateProduct";

export interface PostProduct {
  _id?: string;
  sellerId: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  category: string;
  image_url: string;
  seller: {
    first_name: string;
    last_name: string;
    description: string;
    level: string;
    image_url: string;
  };
  reviews: Review[];
}

interface Review {
  title: string;
  text: string;
  rating: number;
}

export async function FeaturedProducts({}: // featuredProducts,
{
  // featuredProducts: any;
}) {
  const featuredProducts: any = await getAllProducts();
  const plainFeaturedProducts = JSON.parse(JSON.stringify(featuredProducts));
  const firstTen: PostProduct[] = plainFeaturedProducts.slice(0, 6);

  return (
    <>
      <section className="text-center mt-20">
        <h1 className="font-bold text-[2rem] ">Featured Products</h1>
        <p className="max-w-[500px] mx-auto px-2">
          Discover handpicked artisanal gems. Unique, crafted, and ready to
          enchant. Shop the extraordinary.
        </p>
        <div className="grid grid-cols-featuredSmall gap-1 lg:gap-y-10 gap-y-[.8rem] md:grid justify-center items-center content-center md:grid-cols-featured md:gap-[0.5rem] lg:gap-5 my-20 mx-10">
          {firstTen.map((product: any) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </div>
        <Link href={"/shop"}>
          <button
            type="button"
            className="bg-secondaryDark text-white py-2 px-3 flex rounded-[8px] items-center gap-2 mx-auto hover:bg-secondaryBlue duration-200 font-bold"
          >
            See more products
            <FaArrowRightLong />
          </button>
        </Link>
      </section>
    </>
  );
}
