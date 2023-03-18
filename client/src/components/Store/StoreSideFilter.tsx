import { useEffect, useState, Fragment } from "react";
import { configureObj, makeAllKeysLower, toLower } from "@/helpers/func";
import uuid from "react-uuid";

import { useRouter } from "next/router";
import { CategoryInfoType, FilterObjType } from "@/ts/types/app_types";

const StoreSideFilter = ({ genres }: { genres: CategoryInfoType[] }) => {
  const { query, push } = useRouter();
  const [routerParams, setRouterParams] = useState<FilterObjType>({
    category:
      query.category == undefined
        ? []
        : Array.isArray(query.category)
        ? query.category
        : [query.category],
  });

  const makeParamsString = () => {
    let result = "";
    if (routerParams.category.length != 0) {
      routerParams.category.forEach((option, index) => {
        result += `${index == 0 ? "?" : "&"}category=${option}`;
      });
    }
    return result;
  };

  useEffect(() => {
    if (JSON.stringify(query) !== JSON.stringify(routerParams)) {
      let url = "http://localhost:3000/store";
      const params = makeParamsString();
      push(url + params, undefined, { shallow: true });
    }
  }, [routerParams]);

  return (
    <>
      <div className="flex flex-1 w-full  bg-neutral-800 text-[#fff]">
        <div className="w-full h-fit mt-[20px]">
          <button className="px-[20px] py-[10px] w-full flex justify-between  rounded-[6px]">
            <span className="font-[500]">Genres</span>
          </button>
          <ul className="px-[20px] w-full flex flex-col gap-[10px]">
            {genres.map((genre) => {
              const { category: name, games } = genre;
              return (
                <Fragment key={uuid()}>
                  <li
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setRouterParams((prev) => {
                        return configureObj(
                          { ...prev },
                          "category",
                          toLower(name)
                        );
                      })
                    }
                  >
                    <div
                      className={`w-[15px] h-[15px] rounded-[3px] bg-neutral-300 ${
                        routerParams.category.includes(toLower(name))
                          ? "bg-green-600"
                          : ""
                      }`}
                    />
                    <div className="text-[14px] font-[500] flex-1 ml-[15px]">
                      {name}
                    </div>
                    <div className="text-neutral-500">{games.length}</div>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StoreSideFilter;
