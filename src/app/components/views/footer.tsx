import LogoWhite from "../icons/logoWhite";

const Footer = () => {
  return (
    <>
      <footer className="bg-black flex items-center p-5 justify-between flex-wrap">
        <LogoWhite />
        <div className="text-white gap-2 flex">
          <p className="text-[0.7rem] md:text-[0.8rem]">2024 &copy; |</p>
          <p className="text-[0.7rem] md:text-[0.8rem]">
            {" "}
            All rights reserved |
          </p>
          <p className="text-[0.7rem] md:text-[0.8rem]">Handcrafted Haven</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
