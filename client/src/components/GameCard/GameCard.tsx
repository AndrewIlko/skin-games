import { globalActions } from "@/features/globalSlice";
import { GameCardType } from "@/ts/types/app_types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const GameCard = ({
  data,
  className,
}: {
  data: GameCardType;
  className?: string;
}) => {
  const { image, name, price, _id: id } = data;
  const { favGames } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();
  const { setFavGames, removeFavGames } = globalActions;

  return (
    <>
      <div
        className={`border rounded-[8px] relative transition-all ease-in-out duration-300 h-fit ${className} flex flex-col fav-wrapper overflow-hidden`}
      >
        <img src={image} className="rounded-t-[6px]" />

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between px-[15px] py-[20px]">
            <div className="text-[16px] font-[500]">{name}</div>
          </div>
          <div className="flex justify-between items-center px-[25px] py-[20px]">
            <div className="text-[22px] font-[500]">${price["USD"]}</div>
            <button
              onClick={() => {
                favGames.includes(id)
                  ? dispatch(removeFavGames(id))
                  : dispatch(setFavGames(id));
              }}
            >
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="1.5"
                fill={favGames.includes(id) ? "red" : "rgb(0,0,0,0.2)"}
              >
                <path
                  d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z"
                  stroke="inheritColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
