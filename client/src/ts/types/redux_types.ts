import { CartItemType, DecodedJWT } from "./app_types";

export type initialStateGlobal = {
  user: DecodedJWT | null;
  favGames: string[];
  cart: CartItemType[];
};
