import { GameCardType } from "@/ts/types/app_types";
import useWindowWidth from "@/custom_hooks/useWindowWidth";
import Deck from "./Deck";
import { useRouter } from "next/router";

const Hero = ({ gamesForAnimation }: { gamesForAnimation: GameCardType[] }) => {
  const windowWidth: number = useWindowWidth();

  const router = useRouter();

  return (
    <>
      <div className="w-full laptop:px-[88px] laptop:py-[104px] pt-[40px] pb-[24px] flex gap-[30px]">
        <div className="flex flex-col relative z-10 ">
          <div className="text-[24px] tablet:text-[56px] font-[700]">
            Buy games
            <br />
            for CS:GO skins
          </div>
          <div className="text-[14px] tablet:text-[20px] font-[400] mt-[20px] mb-[48px]">
            Get a fair price for your items.
            <br />
            Purchase games with a huge discount.
          </div>
          <div className="flex flex-col">
            <button
              className="font-[600] rounded-[6px] bg-[#29102c] px-[16px] tablet:px-[48px] py-[12px] tablet:py-[24px] text-[#fff] text-[14px] tablet:text-[18px] flex items-center gap-[10px] w-fit"
              onClick={() => {
                router.push("http://localhost:10000/auth/steam");
              }}
            >
              <svg
                className="w-[16px] mt-[1px]"
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="steam"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"
                ></path>
              </svg>
              Log in with Steam
            </button>
          </div>
        </div>
        <div className="flex flex-1 relative">
          <Deck gamesForAnimation={gamesForAnimation} />
        </div>
      </div>
    </>
  );
};

export default Hero;
