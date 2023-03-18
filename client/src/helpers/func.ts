import { FilterObjType } from "@/ts/types/app_types";

export const toLower = (string: string) => {
  return string
    .split("")
    .map((letter) => letter.toLowerCase())
    .join("");
};

export const makeAllKeysLower = (object: any) => {
  const objectCopy: any = {};
  for (let [key, value] of Object.entries(object)) {
    objectCopy[toLower(key)] = value;
  }

  return objectCopy;
};

export const configureObj = (
  object: FilterObjType,
  key: string,
  value: any
) => {
  if (object[key].indexOf(value) !== -1) {
    object[key] = object[key].filter((option: string) => option != value);
  } else {
    object[key].push(value);
  }
  return object;
};
