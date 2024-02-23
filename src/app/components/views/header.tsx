"use client";
import Navigation from "@/app/components/views/navigation";
import Logo from "../icons/logo";
import Link from "next/link";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useSession } from "next-auth/react";

const Header = () => {
  return (
    <>
      <header className="shadow-md shadow-neutral-200 flex justify-between">
        <div className="flex gap-2 ml-5 m-2">
          <Link href={"/"}>
            <p className="sr-only">home</p>
            <Logo />
          </Link>

          <div className="hidden md:block">
            <p>Handcafted</p>
            <p>Haven</p>
          </div>
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
