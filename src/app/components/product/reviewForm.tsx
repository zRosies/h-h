"use client";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

export interface PostReview {
  title: string;
  description: string;
  rating: number;
}

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewSent, setReviewSent] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  async function SubmitReview(e: any) {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setIsSubmitting(true);
    const stars = e.target.elements.stars.value;
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    const payload: PostReview = {
      rating: parseInt(stars),
      description: description,
      title: title,
    };

    const url = process.env.NEXT_PUBLIC_TEST;
    const response = await fetch(`/api/review/${productId}`, {
      method: "PUT",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      setReviewSent(true);
    }
  }

  return (
    <>
      {!reviewSent ? (
        <form
          onSubmit={SubmitReview}
          className="shadow-lg shadow-gray-200 rounded-[10px] flex flex-col my-12 mx-5"
        >
          <p className="border-b-2 border-gray-200 items-center font-semibold p-2  bg-white justify-between text-[.8rem]">
            Write your review
          </p>

          <section className="px-4 flex flex-col gap-5">
            <label htmlFor="stars" className="mt-3 block">
              Rating
              <div className="flex">
                {[...Array(5)].map((start, index) => {
                  const currentRating: number = index + 1;

                  return (
                    <>
                      <input
                        type="radio"
                        className="w-full hidden"
                        value={rating}
                        name="stars"
                        id="stars"
                      />
                      <FaStar
                        className="cursor-pointer"
                        color={
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onClick={() => {
                          setHover(currentRating), setRating(currentRating);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </label>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                id="title"
                name="title"
                className="w-full border-2 border-gray-200 h-[2rem] rounded-[6px]"
              />
            </label>
            <label htmlFor="description">
              Description:
              <input
                type="text"
                id="description"
                name="description"
                className="w-full border-2 border-gray-200 h-[5rem] rounded-[6px]"
              />
            </label>
            <button
              type="submit"
              className={`bg-secondary hover:bg-secondaryBlue flex justify-center items-center duration-200 text-white p-2 rounded-[5px] my-4 ${
                submitting && "pointer-events-none "
              }`}
            >
              Submit
              {submitting && (
                <span className="animate-loading ml-2">
                  <AiOutlineLoading />
                </span>
              )}
            </button>
          </section>
        </form>
      ) : (
        <p className="flex font-semibold bg-white text-[.8rem]  justify-center animate-soft mt-[12rem]">
          Your review has been submitted{" "}
          <FaCheck className="text-green-500 ml-2" />
        </p>
      )}
    </>
  );
}
