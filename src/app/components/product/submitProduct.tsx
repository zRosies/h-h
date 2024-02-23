"use client";

import cloudinary from "cloudinary";
import { env } from "process";
import { Readable } from "stream";
import style from "./styles.module.scss";
import { UserInfo } from "@/app/product/[artId]/page";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { useState } from "react";

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

export default function SubmitProduct({
  formType = "update",
  userInfo,
  data,
  setCardOpen,
}: {
  formType?: string;
  userInfo: UserInfo;
  data?: any;
  setCardOpen: any;
}) {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);

  const PostProduct = async (e: any) => {
    e.preventDefault();
  };

  const UpdateProduct = async (e: any) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    const file = e.target.elements.picture.files[0];

    formData.append("file", file);
    formData.append("upload_preset", "handcraft");

    const image = await fetch(
      "https://api.cloudinary.com/v1_1/dygktir99/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    const imageUrl = image.secure_url;
    const title = e.target.elements.title.value;
    const productId = e.target.elements.productId.value;
    const category = e.target.elements.category.value;
    const price = e.target.elements.price.value;
    const description = e.target.elements.description.value;
    const rating = e.target.elements.rating.value;

    const payload: PostProduct = {
      sellerId: userInfo.id,
      title: title,
      description: description,
      price: price,
      rating: parseFloat(rating),
      category: category,
      image_url: imageUrl,
      seller: {
        first_name: userInfo.userInfo.first_name,
        last_name: userInfo.userInfo.last_name,
        description: userInfo.userInfo.description,
        level: userInfo.userInfo.level,
        image_url: userInfo.userInfo.image,
      },
      reviews: [],
    };

    if (formType === "update") {
      const insertedToMongoDB = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (insertedToMongoDB.ok) {
        router.push("/dashboard");
      }
    }

    if (formType === "POST") {
      const insertedToMongoDB = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (insertedToMongoDB.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div
        className="w-full h-full fixed z-30 bg-[rgba(0,0,0,0.6)] left-0 top-0"
        onClick={() => setCardOpen((prevState: boolean) => !prevState)}
      ></div>
      <form
        action=""
        onSubmit={UpdateProduct}
        className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2  max-w-[340px]  md:max-w-[550px] flex flex-col shadow-lg w-full justify-center bg-white z-50 rounded-[6px]"
      >
        <h1 className="border-b-2 border-gray-200 items-center font-bold p-2 px-4 bg-white justify-between flex  ">
          {formType === "update" ? (
            <>
              <span> Edit product</span>
              <span
                className="cursor-pointer"
                onClick={() => setCardOpen((prevState: boolean) => !prevState)}
              >
                <IoMdClose />
              </span>
            </>
          ) : (
            <span>Add art</span>
          )}
        </h1>
        <section className="px-5 flex flex-col py-5 gap-5 bg-white">
          <label htmlFor="productId" className="sr-only ">
            <input
              type="text"
              name="productId"
              id="productId"
              defaultValue={
                formType === "update" ? `${data._id?.toString()}` : undefined
              }
            />
          </label>
          <label htmlFor="rating" className="sr-only ">
            <input
              type="text"
              name="rating"
              id="rating"
              defaultValue={
                formType === "update" ? `${data.rating?.toString()}` : 0
              }
            />
          </label>
          <label htmlFor="title " className="flex flex-col font-bold">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className="border-2 rounded-[6px] p-2 h-10"
              required
              defaultValue={formType === "update" ? `${data.title}` : ""}
            />
          </label>
          <label htmlFor="description" className="flex flex-col font-bold">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              className="border-2 rounded-[6px] p-2 h-10"
              placeholder="description"
              defaultValue={formType === "update" ? `${data.description}` : ""}
              required
            />
          </label>
          <label htmlFor="category" className="w-full ">
            Select your category:
            <select
              name="category"
              id="category"
              defaultValue={formType === "update" ? `${data.category}` : ""}
              required
              className=" w-full border-2 border-gray-200"
            >
              <option value="Art">Art</option>
              <option value="Ornment">Ornment</option>
              <option value="Accessory">Accessory</option>
              <option value="Sculpture">Sculpture</option>
            </select>
          </label>
          <label htmlFor="price" className="flex flex-col font-bold">
            Price:
            <input
              type="number"
              name="price"
              id="price"
              className="border-2 rounded-[6px] p-2 h-10"
              placeholder="price"
              defaultValue={formType === "update" ? `${data.price}` : ""}
              required
            />
          </label>
          <label htmlFor="picture" className="flex flex-col font-bold ">
            Picture:
            <input
              type="file"
              name="picture"
              id="picture"
              placeholder="picture"
              className={style.test}
              required
            />
          </label>
          <button
            type="submit"
            className={`flex w-full bg-secondary hover:bg-secondaryBlue text-white justify-center p-3 rounded-[6px] items-center ${
              submitting && " pointer-events-none"
            }`}
          >
            {formType === "update" ? <span>Update</span> : <span>Save</span>}
            {submitting && (
              <span className="animate-loading ml-2">
                <AiOutlineLoading />
              </span>
            )}
          </button>
        </section>
      </form>
      ;
    </>
  );
}

// export async function submitArt(formData: FormData) {
//     // -------------Adding the image to cloudnary and getting the CDN url from there befor adding it into mongodb --------------
//     const file = formData.get("picture") as File;
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const readableStream = new Readable();
//     readableStream.push(Buffer.from(buffer));
//     readableStream.push(null);

//     let imageUrl;
//     try {
//       const result: any = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.v2.uploader.upload_stream(
//           (error, result) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//         readableStream.pipe(uploadStream);
//       });

//       imageUrl = result.url;
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//     }

//     // -------------------------------------------------------------------------------
//

//   export async function updateArt(formData: FormData) {}
