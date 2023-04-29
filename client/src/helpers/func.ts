import { FilterObjType } from "@/ts/types/app_types";

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

export const removeLetters = (str: string) => {
  const strArr = str.split("");
  const result = [];
  for (let i = 0; i < strArr.length; i++) {
    if (".".includes(strArr[i]) && Number.isInteger(+strArr[i - 1])) {
      result.push(strArr[i]);
    }
    if (strArr[i - 1] != " " && Number.isInteger(+strArr[i])) {
      result.push(strArr[i]);
    }
  }
  return result.join("");
};

export const generateArr = (length: number) => {
  return new Array(length).fill(0);
};
