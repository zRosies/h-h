import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Login | Handcrafted Haven",
  description: "Handcrafted Haven website, login in and post your arts",
};

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default LoginLayout;
