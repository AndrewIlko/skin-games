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
import LoginSteamBtn from "@/components/Header/LoginSteamBtn";

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
          {user && (
            <>
              <div className="flex gap-[10px]">
                <Balance />
                <AccountNav />
              </div>
            </>
          )}
          {!user && <LoginSteamBtn />}
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
