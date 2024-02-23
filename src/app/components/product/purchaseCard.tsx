"use client";
import Image from "next/image";
import ReviewRating from "../ReviewRating/ReviewRating";
import { UserInfo } from "@/app/product/[artId]/page";
import { useState } from "react";
import DeleteForm from "./deleteForm";
import { ReviewForm } from "./reviewForm";
import SubmitProduct from "./submitProduct";
import CustomerReviews from "../customerReviews/customerReviews";
import { Checkout } from "./checkout";

const PurchaseCard = ({
  data,
  user,
  artId,
}: {
  data: any;
  user: UserInfo;
  artId: string;
}) => {
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [sucessful, setIsSuccessful] = useState(false);

  const [deleteCardOpen, setDeleteCardOpen] = useState<boolean>(false);
  const [checkout, setCheckoutCard] = useState<boolean>(false);

  // console.log(user);

  return (
    <>
      <section className="flex flex-col justify-center items-center md:flex-row md:items-start w-full mx-auto md:justify-center gap-5">
        <div>
          <div className=" w-[350px] md:w-[450px] h-[500px] rounded-[10px] overflow-hidden">
            <Image
              src={`${data.image_url}`}
              alt={"prodct"}
              width={500}
              height={500}
              className=" object-cover w-full h-full"
            />
          </div>
          <section className="shadow-sm w-[350px] md:w-[450px] rounded-[6px] border-[1px] border-[#D9D9D9]  gap-3 mt-4 ">
            <h3 className="font-semibold border-b-[1px] border-[#D9D9D9] px-4 p-1">
              About the crafter
            </h3>
            <div className="flex  justify-between p-4">
              <div className="flex flex-col">
                <div className="flex gap-5">
                  <h3 className="font-semibold">{`${data.seller.first_name} ${data.seller.last_name}`}</h3>
                  <span>
                    <span className=" bg-primaryLight px-1 rounded-[8px]">
                      {data.seller.level}
                    </span>{" "}
                  </span>
                </div>
                <p>{data.seller.description}</p>
              </div>
              {data.seller.image_url ? (
                <Image
                  src={data.seller.image_url}
                  alt="author"
                  width={500}
                  height={500}
                  className="rounded-[50%] min-w-[80px] max-h-[80px] h-[70px] w-[80px]"
                ></Image>
              ) : (
                <div className="rounded-[50%] min-w-[60px] max-h-[60px] h-[50px] w-[60px] bg-primaryLight flex items-center justify-center font-semibold">{`${
                  data.seller.first_name.slice(0, 1) +
                  data.seller.last_name.slice(0, 1)
                }`}</div>
              )}
            </div>
          </section>
        </div>
        <section className=" w-[350px] lg:w-[400px] relative">
          <div className="border-[1.5px] border-[#D9D9D9]  rounded-[8px] p-3">
            <div className="flex justify-start gap-5">
              <p className="bg-[#EDEDED]  p-1 rounded-[8px] text-[0.8rem]">
                {data.title}
              </p>
              <p className="bg-primaryLight p-1 rounded-[8px] text-[0.8rem] ">
                Functional Crafts
              </p>
            </div>
            <p className="font-semibold text-[1.8rem]">{data.title}</p>
            <div className="flex items-center my-1">
              <span> {data.rating.toFixed(1)} </span>
              <span className=" flex ml-1">
                <ReviewRating
                  rating={data.rating.toFixed(0)}
                  starColor={"#FFB951"}
                />
              </span>
            </div>
            <p>{data.description}</p>
            <p className="font-semibold text-[#0A8A0F] text-[2rem]">
              ${data.price}
            </p>
          </div>
          {user?.id === data.sellerId ? (
            <div className="flex w-full gap-3 my-10">
              <button
                onClick={() => setDeleteCardOpen((prevState) => !prevState)}
                type="button"
                className=" border-2 flex w-full justify-center border-red-600 hover:bg-red-600 hover:text-white font-semibold px-4 rounded-[8px] py-2 duration-200 text-red-600"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setCardOpen((prevState) => !prevState)}
                className="bg-secondary hover:bg-secondaryBlue flex w-full justify-center text-white px-4 rounded-[8px] py-2 duration-200"
              >
                Edit
              </button>
            </div>
          ) : (
            <button
              className="bg-primary hover:bg-primaryDark duration-200 text-white p-3 w-full flex text-center rounded-[12px] justify-center mt-5"
              onClick={() => setCheckoutCard(true)}
            >
              Buy now
            </button>
          )}
        </section>
      </section>
      <div>
        <div className="flex flex-col justify-center items-center pb-5 w-full mx-auto mt-20">
          <p className="font-semibold pb-4">Customer Reviews</p>
          <hr className="border-b-gray-700 border-w-[700px] md:w-[900px]" />
        </div>
        <section className="flex flex-col-reverse justify-center items-center md:flex-row md:items-start w-full mx-auto md:justify-center p-5 pt-0 -mt-5 pb-5 gap-5">
          <div className=" w-[350px] rounded-[10px] overflow-hidden gap-2 bg-white overflow-y-auto h-[450px] mt-5 flex">
            {data.reviews.length > 0 ? (
              <CustomerReviews
                reviews={data.reviews}
                className="rounded-[10px] bg-[#EDEDED] w-[320px]"
              />
            ) : (
              <div>
                <p className="text-center text-gray-500 flex self-center content-center justify-center mt-40">
                  No reviews yet!
                </p>
              </div>
            )}
          </div>
          <div className=" w-[320px] md:w-[420px] rounded-[10px] overflow-hidden [&>div>*]:bg-[#EDEDED] h-[450px]">
            <ReviewForm productId={artId} />
          </div>
        </section>
      </div>

      {checkout && (
        <Checkout
          setSucess={setIsSuccessful}
          product={data}
          setCardOpen={setCheckoutCard}
        />
      )}
      {sucessful && (
        <>
          <div
            className="w-full h-full fixed z-30 bg-[rgba(0,0,0,0.6)] left-0 top-0"
            onClick={() => setIsSuccessful(false)}
          ></div>
          <div className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[340px]   flex flex-col shadow-lg w-full justify-center bg-white z-50 rounded-[6px] p2-">
            <div className="border-b-2 border-gray-200 items-center font-bold  p-4 bg-white justify-between flex flex-col rounded-[10px]">
              <p>Your purchase has been submitted.</p>
              <p className="mb-10"> Our team will get in contact with you!</p>
              <button
                className="bg-secondary text-white p-2 my-2 w-full"
                onClick={() => setIsSuccessful(false)}
              >
                Okay, thanks!
              </button>
            </div>
          </div>
        </>
      )}

      {/* <SaveOrUpdateProduct data={data} /> */}
      {cardOpen && (
        <SubmitProduct data={data} userInfo={user} setCardOpen={setCardOpen} />
      )}

      {deleteCardOpen && (
        <DeleteForm
          user={user}
          setCardOpen={setDeleteCardOpen}
          productId={artId}
        />
      )}
    </>
  );
};

export default PurchaseCard;
