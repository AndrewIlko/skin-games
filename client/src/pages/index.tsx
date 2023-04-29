import Header from "@/components/Header/Header";
import Hero from "@/components/Hero";
import Logo from "@/components/Header/Logo";
import Main from "@/components/Main";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { fetchData } from "@/helpers/fetchFunc";
import { GameCardType, CategoryInfoType } from "@/ts/types/app_types";
import { useSelector } from "react-redux";
import AccountNav from "@/components/Header/AccountNav";
import Balance from "@/components/Header/Balance";
import CategoriesTiles from "@/components/CategoryDisplay/CategoriesTiles";

export default function Home({
  heroGames,
  categories,
}: {
  heroGames: GameCardType[];
  categories: CategoryInfoType[];
}) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.global);

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Skin games app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header>
        <Logo />
        <div className="flex justify-center gap-[10px] items-center">
          <div>
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="1.5"
              fill={"none"}
            >
              <path
                d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          {user && (
            <>
              <div className="flex gap-[10px]">
                <Balance />
                <AccountNav />
              </div>
            </>
          )}
          {!user && (
            <button
              className="font-[600] rounded-[6px] bg-[#29102c] px-[16px] py-[12px] text-[#fff] text-[14px] flex items-center gap-[10px] w-fit"
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
          )}{" "}
        </div>
      </Header>
      <Main>
        {!user && <Hero gamesForAnimation={heroGames} />}
        <CategoriesTiles categories={categories} />
      </Main>
    </>
  );
}

const fetchHeroGames = async () => {
  const games: string[] = [
    "640cac76daaced3ef8d07b82",
    "641326310fa96767532f97b3",
    "64132a850fa96767532f97b4",
    "64132ac10fa96767532f97b5",
    "64132bd00fa96767532f97b6",
  ];

  let result = await Promise.all(
    games.map(async (id) => {
      try {
        const game = await fetchData(`/game/${id}`);
        return game.data;
      } catch (e) {
        return undefined;
      }
    })
  );
  result = result.filter((game) => game != undefined);
  if (result.length == 0) return null;

  return result;
};

export const getStaticProps = async () => {
  const heroGames = await fetchHeroGames();
  const categories = await fetchData("/categories");

  return {
    props: {
      heroGames,
      categories,
    },
  };
};
