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
import LoginSteamBtn from "@/components/Header/LoginSteamBtn";
import Cart, { CartSvg } from "@/components/Header/Cart";
import { globalActions } from "@/features/globalSlice";
import { useDispatch } from "react-redux";

const AddToCart = (props: { onClick: Function }) => {
  const { onClick } = props;
  return (
    <button
      onClick={() => onClick()}
      className="px-[20px] py-[10px] w-full border border-neutral-800 rounded-[6px] font-[500] flex justify-center items-center"
    >
      <div className="flex items-center gap-[10px]">
        <CartSvg className={"text-neutral-800 w-[18px] h-[18px]"} />
        <span>Add to cart</span>
      </div>
    </button>
  );
};

export default function GamePage(props: { game: GameCardType }) {
  const { game } = props;
  const router = useRouter();
  const { user, cart } = useSelector((state: any) => state.global);
  const { addToCart } = globalActions;
  const dispatch = useDispatch();

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
                <Cart />
                <AccountNav />
              </div>
            </>
          )}
          {!user && <LoginSteamBtn />}
        </div>
      </Header>
      <Main>
        <div className="mt-[60px] grid grid-game-page gap-[30px]">
          <div className="">
            <img src={game.image} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-[500]">{game.name}</h1>
          </div>
          <div className="flex flex-col">
            <div className="w-full border shadow-md rounded-[6px] px-[20px] py-[15px]">
              <AddToCart
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: game._id,
                      image: game.image,
                      count: 1,
                      name: game.name,
                      price: game.price,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const gameId = params.id;
  const game = await fetchData(`/game/${gameId}`);

  return {
    props: {
      game: game.data,
    },
  };
}

export async function getStaticPaths() {
  const postIds: any[] = [];

  const paths = postIds.map((postId) => ({
    params: { id: postId },
  }));

  return {
    paths,
    fallback: true, // Set to true if you want to fallback to server-side rendering for paths not defined here
  };
}
