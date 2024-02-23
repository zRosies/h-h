import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import CustomerReviews from "@/app/components/customerReviews/customerReviews";
import { FeaturedProducts } from "./components/Featured";
import { getAllProducts } from "./api/controllers/controllers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Handcrafted Haven",
  description: "Handcrafted Haven website, come and post your arts",
};

const reviews = [
  {
    rating: 5,
    title: "Exquisite Craftsmanship!",
    description: `I purchased this piece for my living room, and it's absolutely stunning! The craftsmanship is exquisite, 
    and it adds a touch of elegance to my home. Highly recommended!`,
  },
  {
    rating: 5,
    title: "Surrealistic Masterpiece",
    description:
      "This captivating artwork transcends reality, inviting viewers into a dreamlike world of vivid imagination and surreal beauty.",
  },
  {
    rating: 4,
    title: "Contemporary Abstract Expressionism",
    description:
      "A dynamic explosion of colors and textures, this piece stimulates the senses and evokes deep emotions through its expressive brushwork.",
  },
];

export default async function Home() {
  return (
    <>
      <div className="flex flex-row mt-0 grow gap-0 md:flex-row  pr-0 mr-0 justify-between my-5">
        <div className="flex flex-col m-4  gap-10 md:w-2/3 md:px-20 pr-0 mr-0">
          <h1 className="mt-12  font-bold text-2xl lg:text-7xl ">
            Embark on a Treasure Hunt: Discover & Delight in Artisanal Wonders
          </h1>
          <p className=" font-normal text-lg leading-7 text-[#515151]">
            Unveil unique stories and extraordinary wonders. Celebrate the
            beauty of handmade treasures, ready to be found and cherished.
          </p>

          <Link
            href={"/shop"}
            className="p-3 rounded-[8px] bg-primary flex items-center gap-2 w-[150px] text-white justify-center hover:bg-primaryDark duration-200"
          >
            Discover
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="flex items-center md:w-1/3 justify-end pr-0 mr-0">
          <Image
            src="/home-image.png"
            width={458}
            height={687}
            className="hidden md:block"
            alt="Home page image on desktop view"
          />
          <Image
            src="/home-image.png"
            width={458}
            height={687}
            className="block md:hidden"
            alt="Home page image on mobile view"
          />
        </div>
      </div>
      <FeaturedProducts />

      <section className="max-w-screen-lg py-10 px-10 lg:px-20 flex flex-col justify-center items-center gap-8 bg-[#f9e8d5] text-black lg:mx-auto my-20 rounded-[8px] mx-10">
        <h2 className="lg:text-[2rem] text-3xl font-bold  text-black max-w-screen-md">
          Crafters, Be Seen: Join Our Artistic Community!
        </h2>
        <p className="text-[1.3rem] text-black max-w-screen-lg">
          Bring your creations to life on our platform. Join a community that
          celebrates your unique craft. Your art, your way.{" "}
          <Link href={"/login"} className="text-[#1e75c6] font-bold underline">
            Register Now!
          </Link>
        </p>
      </section>

      {/* Customer reviews section */}
      <section className="bg-gray-200 flex flex-col justify-center items-center py-26 px-4 sm:py-16 sm:px-16 ">
        <h2 className="text-[2rem] font-bold text-black mb-8  text-center">
          {"Customer Raves: Unveil Our Artisanal Community's Voice."}
        </h2>
        <p className="lg:text-[1.3rem] text-xl text-gray-700 max-w-screen-md text-center">
          Discover what our community is saying about their Handcrafted Haven
          experience.
        </p>
        <CustomerReviews
          reviews={reviews}
          className="bg-white max-w-[400px] rounded-[8px] w-full"
        />
      </section>
    </>
  );
}
