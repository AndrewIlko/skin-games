import { DB } from ".";
import { SteamUser } from "./ts/db_types";

export const validUser = async (user: SteamUser) => {
  const userFromDB = await (await DB())
    .collection("users")
    .findOne({ steam_id: user.id });
  return userFromDB;
};

export const createUser = async (user: SteamUser) => {
  const userIdObj = await (await DB()).collection("users").insertOne({
    steam_id: user.id,
    name: user.displayName,
    image: user.photos ? user.photos[2].value : "",
    balance: 0,
  });
  const userFromDB = {
    _id: userIdObj.insertedId,
    steam_id: user.id,
    name: user.displayName,
    image: user.photos ? user.photos[2].value : "",
    balance: 0,
  };

  return userFromDB;
};
