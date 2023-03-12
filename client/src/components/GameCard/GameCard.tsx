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
        className={`p-[10px] border shadow-md rounded-lg hover:shadow-sm transition-all ease-in-out duration-300 h-fit ${className}`}
      >
        <img className="rounded" src={image} />
        <div className="flex justify-between mt-[15px]">
          <div>{name}</div>
          <div>{price.USD}$</div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
