"use client";
import Image from "next/image";
import LoginForm from "../components/login/loginForm";
import RegisterForm from "../components/login/registerForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Login() {
  const [registerOpen, setRegisOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  return (
    <>
      <h1 className="font-bold text-center text-lg my-2 mx-1">
        Sign in to Your Handcrafted Haven Account
      </h1>
      <p className="text-center text-sm mb-5 mx-5">
        Welcome Back! Your creative journey continues here.
      </p>
      {registerOpen ? (
        <RegisterForm setRegOpen={setRegisOpen} />
      ) : (
        <LoginForm router={router} setRegisOpen={setRegisOpen} />
      )}

      <div className="my-14  flex items-center flex-col mx-5 ">
        <h1 className="font-bold text-[2rem] my-2">
          Craft, Showcase, Share Globally: Your Art Hub.
        </h1>
        <p className="max-w-[900px] mx-auto mb-10 text-center">
          Crafters, Showcase Your Magic Worldwide! Join our vibrant community,
          celebrate uniqueness, and effortlessly share, sell, and craft success
          together!
        </p>
        <Image
          src={
            "https://res.cloudinary.com/dygktir99/image/upload/f_auto,q_auto/bpicpaa189zsd2w0bz7h"
          }
          alt="image_login"
          width={900}
          height={400}
          className="w-[900px] h-auto"
        />
      </div>
    </>
  );
}
