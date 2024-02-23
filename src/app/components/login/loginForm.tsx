"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import GoogleIcon from "../icons/googleIcon";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function LoginForm({
  router,
  setRegisOpen,
}: {
  router: any;
  setRegisOpen: any;
}) {
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

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setError("Invalid email or password");
      if (response?.url) router.replace("/");
      else {
        setError("");
      }
    }
  };
  return (
    <>
      <form
        className="flex flex-col lg:shadow-md  max-w-[450px] mx-auto rounded-sm px-10 py-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-[1.5rem]">Login</h1>
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
          className="bg-secondary hover:bg-secondaryBlue duration-200 p-3 text-white flex justify-center items-center"
        >
          Login{" "}
          {isSubmitting && (
            <span className="ml-2 animate-loading">
              <AiOutlineLoading />
            </span>
          )}
        </button>
        {error && <span className="text-red-400">{error}</span>}
        <p className="text-center my-2">
          Do not have an account?{" "}
          <a
            className="text-linkColor cursor-pointer hover:underline"
            onClick={() => {
              setRegisOpen(true);
            }}
          >
            Sign up
          </a>
        </p>
        <p className="text-$neutral3 text-center my-1">or</p>
        <p
          onClick={() => {
            signIn("github");
          }}
          className="bg-black hover:bg-[#242424] duration-200 p-2 flex items-center justify-center gap-2 rounded-[5px] my-2 cursor-pointer"
        >
          <FaGithub className="stroke-white text-white w-[30px] h-[30px]" />{" "}
          <span className="text-white"> Sign in with Github</span>
        </p>
        <p
          // href={"/"}
          className="bg-neutral-100 hover:bg-neutral-200 duration-200 p-2 flex items-center justify-center gap-2 rounded-[5px] mt-4 cursor-pointer"
          onClick={() => {
            signIn("google");
          }}
        >
          <GoogleIcon />
          <span> Log in with Google</span>
        </p>
      </form>
    </>
  );
}
