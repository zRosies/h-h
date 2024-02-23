import styles from "@/app/dashboard/styles.module.scss";
import {
  getAllProducts,
  getProductsById,
} from "../../api/controllers/controllers";
import ProductCard from "./productCard";

export interface Product {
  _id: string;
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

export async function ProductList({ userId }: any) {
  const products: any = await getProductsById(userId);
  if (products.length < 1) {
    return (
      <>
        <div className="mx-5 my-[8rem]">
          Add your art and start showing your work!
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-featuredSmall justify-center lg:justify-start gap-1 md:gap-3 gap-y-2 md:grid md:grid-cols-featured lg:mx-5 my-5">
      {products.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
