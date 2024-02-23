"use client";

import { UserInfo } from "@/app/product/[artId]/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteForm({
  user,
  setCardOpen,
  productId,
}: {
  user: UserInfo;
  setCardOpen: any;
  productId: string;
}) {
  const router = useRouter();
  const deleteProduct = async (e: any) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_TEST;

    try {
      const response = await fetch(`${url}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        className="w-full h-full fixed z-30 bg-[rgba(0,0,0,0.6)] left-0 top-0"
        onClick={() => setCardOpen((prevState: boolean) => !prevState)}
      ></div>
      <form
        onSubmit={deleteProduct}
        className="fixed items-center p-5 inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-[20px] z-50 flex flex-col justify-center shadow-lg bg-white z-100"
      >
        <h1 className="bg-white text-center">
          Do you really want to delete this art?
        </h1>
        <div className="flex w-full my-10 gap-2 ">
          <button
            onClick={() => setCardOpen((prevState: boolean) => !prevState)}
            className="bg-neutral-200 w-full p-2 rounded-[6px] "
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white w-full p-2 rounded-[6px]"
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}
