import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href={"/"} shallow={true}>
        <div className="text-[24px] font-[600] text-[#171717]">Skin games</div>
      </Link>
    </>
  );
};

export default Logo;
