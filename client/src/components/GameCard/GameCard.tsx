import { GameCardType } from "@/ts/types/app_types";

const GameCard = ({
  data,
  className,
}: {
  data: GameCardType;
  className?: string;
}) => {
  const { image, name, price } = data;

  return (
    <>
      <div
        className={`border shadow-md rounded-[8px] p-[10px] hover:shadow-sm transition-all ease-in-out duration-300 h-fit ${className} flex flex-col`}
      >
        <img src={image} className="rounded-[6px]" />

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between px-[15px] py-[20px]">
            <div className="text-[16px] font-[500]">{name}</div>
          </div>
          <div className="px-[15px] text-[22px] py-[20px] font-[500]">
            ${price["USD"]}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
