import EmptyStore from "@/components/Errors/EmptyStore";
import GameCard from "@/components/GameCard/GameCard";
import AccountNav from "@/components/Header/AccountNav";
import Balance from "@/components/Header/Balance";
import Header from "@/components/Header/Header";
import Logo from "@/components/Header/Logo";
import Main from "@/components/Main";
import StoreSideFilter from "@/components/Store/StoreSideFilter";
import { fetchData } from "@/helpers/fetchFunc";
import { generateArr } from "@/helpers/func";
import { CategoryInfoType, GameCardType } from "@/ts/types/app_types";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

const StorePage = ({ categories }: { categories: CategoryInfoType[] }) => {
  const router = useRouter();
  const [games, setGames] = useState<GameCardType[] | null>(null);
  const { user } = useSelector((state: any) => state.global);
  const abortController = useRef(new AbortController());

  const fetchGames = async () => {
    try {
      abortController.current.abort();
      abortController.current = new AbortController();
      setGames(null);
      const response = await axios.get(
        `http://localhost:10000${router.asPath}`,
        {
          signal: abortController.current.signal,
        }
      );
      const data = response.data;
      setGames(data.games);
    } catch (e) {}
  };

  useEffect(() => {
    fetchGames();
    return () => abortController.current.abort();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>{router.query.id}</title>
        <meta name="description" content="Skin games app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header>
        <Logo />
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
        )}
      </Header>
      <Main>
        <div className="grid-store min-h-[calc(100vh-64px)]">
          <StoreSideFilter genres={categories} />

          {games && games.length == 0 && <EmptyStore />}
          {!games && (
            <>
              <div className="grid grid-cols-4 py-[30px] gap-[20px] w-full mx-auto h-fit">
                {generateArr(12).map(() => {
                  return (
                    <Fragment key={uuid()}>
                      <div className="w-full h-[250px] animate-pulse border shadow-md rounded-[8px] p-[10px] flex flex-col">
                        <div className=" bg-gray-200 rounded-[8px] dark:bg-gray-300 w-full h-[100px]" />
                        <div className="flex flex-col flex-1 justify-between">
                          <div className=" bg-gray-200 rounded-[4px] dark:bg-gray-300 w-[60%] h-[24px] mx-[20px] my-[15px]" />
                          <div className=" bg-gray-200 rounded-[4px] dark:bg-gray-300 w-[65px] h-[37px] mx-[15px] my-[20px]" />
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </>
          )}
          {games && games.length != 0 && (
            <>
              <div className="grid grid-cols-4 py-[30px] gap-[20px] w-full mx-auto h-fit">
                {games.length != 0 &&
                  games.map((game: GameCardType) => {
                    return (
                      <Fragment key={uuid()}>
                        <Link href={`/store/${game._id}`}>
                          <GameCard
                            data={game}
                            className={`bg-white max-w-[250px] h-full select-none cursor-pointer`}
                          />
                        </Link>
                      </Fragment>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </Main>
    </>
  );
};

export default StorePage;

export const getServerSideProps = async (context: any) => {
  const categories = await fetchData("/categories");

  return {
    props: {
      categories,
    },
  };
};

// export const getStaticPaths = async (context: any) => {
//   const categories = await fetchCategories();
//   const categoriesEdited = categories.map((category: CategoryInfoType) => {
//     const { category: name } = category;
//     return { params: { id: `${name}-games` } };
//   });

//   return {
//     paths: [...categoriesEdited],
//     fallback: false,
//   };
// };
