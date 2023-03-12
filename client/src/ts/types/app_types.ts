export type GameCardType = {
  _id: string;
  image: string;
  name: string;
  price: {
    USD: string;
    EUR?: string;
    PLN?: string;
  };
  steam_price?: {
    USD: string;
    EUR: string;
    PLN: string;
  };
};
