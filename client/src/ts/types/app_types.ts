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

export type DecodedJWT = {
  exp: number;
  iat: number;
  displayName: string;
  id: string;
  photos: object;
  provider: string;
  _json: string;
};

export type CategoryInfoType = {
  _id: string;
  games: string[];
  category: string;
};

export type CategoriesIconsType = {
  [key: string]: any;
  Action: any;
  Adventure: any;
  RPG: any;
  Indie: any;
  Simulation: any;
};

export type FilterObjType = {
  [key: string]: any;
  category: string[];
  currency: string;
  from: string;
  to: string;
  name: string;
};
