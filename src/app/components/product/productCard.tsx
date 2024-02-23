import productImg from "@/app/dashboard/product.png";
import styles from "@/app/dashboard/styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  _id?: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
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

export default function ProductCard({ product }: { product: Product }) {
  return (
    // className={styles.cardImg}
    //
    <Link
      href={`/product/${product._id}`}
      className="bg-neutral1 rounded-[8px] w-full relative overflow-hidden h-[370px]  items-center"
    >
      <div className="overflow-hidden h-[250px] w-full ">
        <Image
          width={300}
          height={400}
          src={`${product.image_url}`}
          alt={`${product.title}`}
          className="hover:scale-105 duration-300 rounded h-full w-full object-cover "
        />
      </div>

      <div className="absolute gap-3 flex top-[12.9rem] left-[0.13rem] ">
        <span className="bg-primaryLight py-1 px-2 rounded-[8px] text-[0.8rem] md:text-[1rem]">
          {product.category}
        </span>
        <span className="bg-primaryLight py-1 px-2 rounded-[8px] text-[0.8rem] md:text-[1rem]">
          {product.seller.level}
        </span>
      </div>

      <div className={styles.cardInfo}>
        <div className="flex justify-between mx-1 md:mx-5 font-semibold items-center mt-2">
          <p className="text-[1.1rem] md:text-[1.2rem]">{product.title}</p>
          <p className="text-[1rem]">${product.price}</p>
        </div>
        <p className="my-6 text-[0.8rem] mx-2 ">{product.description}</p>
      </div>
    </Link>
  );
}
