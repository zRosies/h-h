import Link from "next/link";

const LinkButton = ({
  href,
  text,
  style,
  onClick,
}: {
  href: string;
  text: string;
  style?: any;
  onClick?: any;
}) => {
  return (
    <>
      <Link href={href} className={`text-black ${style}`} onClick={onClick}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
