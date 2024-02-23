"use client";
import Link from "next/link";
import LinkButton from "../linkButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { getServerSession } from "next-auth";

const Navigation = () => {
  const session = useSession();

  return (
    <>
      <nav className="flex items-center mr-4">
        <div className="flex justify-between gap-4 items-center">
          {session.status === "authenticated" && (
            <LinkButton
              href="/dashboard"
              text="My profile"
              style={"font-bold text-[.9rem] md:text-[1rem]"}
            ></LinkButton>
          )}

          {session.status !== "authenticated" && (
            <LinkButton
              href="/login"
              text="Sign in"
              style={"font-bold text-[.9rem] md:text-[1rem]"}
            ></LinkButton>
          )}
          <LinkButton
            href="/shop"
            text="Shop"
            style={
              "bg-black text-white px-[24px] py-[7px] rounded-[20px] hover:bg-neutral-800 duration-200  font-bold"
            }
          ></LinkButton>
        </div>
        {session.status === "authenticated" && (
          <span
            className="flex items-center mx-2 hover:underline cursor-pointer text-[.8rem] md:text-[1rem]"
            onClick={() => {
              signOut();
            }}
          >
            Log out <RiLogoutBoxRFill className="w-6 h-10" />
          </span>
        )}
      </nav>
    </>
  );
};

export default Navigation;
