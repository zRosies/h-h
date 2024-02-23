"use client";

import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function RegisterForm({ setRegOpen }: { setRegOpen: any }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    // console.log(email, password);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // console.log(response);

      if (response.status === 400) {
        setError("This email is already in use. Please try again");
      }
      if (response.status == 201) {
        setError("");
        setRegOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center font-bold text-[1.5rem]">Register now</h1>
      <form
        className="flex flex-col   max-w-[450px] mx-auto rounded-sm px-10 py-5 h-[350px]"
        onSubmit={handleSubmit}
      >
        <span
          className="stroke-black mt flex items-center gap-1 mb-5 cursor-pointer"
          onClick={() => {
            setRegOpen(false);
          }}
        >
          <MdOutlineKeyboardArrowLeft /> Return
        </span>

        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="border-2 border-neutral-100 h-[40px] my-4"
          placeholder="Email"
        ></input>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          className="h-[40px] border-neutral-100 border-2 mb-8"
        ></input>
        <button
          type="submit"
          className="bg-secondary  p-3 text-white flex items-center justify-center"
        >
          Register
          {isSubmitting && (
            <span className="animate-loading ml-2">
              <AiOutlineLoading />
            </span>
          )}
        </button>
        {error && <span className="text-red-400">{error}</span>}
      </form>
    </>
  );
}
