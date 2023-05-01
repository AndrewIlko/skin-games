import { useEffect, useState, Fragment } from "react";
import { configureObj, removeLetters } from "@/helpers/func";
import uuid from "react-uuid";

import { useRouter } from "next/router";
import { CategoryInfoType, FilterObjType } from "@/ts/types/app_types";

const StoreSideFilter = ({ genres }: { genres: CategoryInfoType[] }) => {
  const { query, push, asPath } = useRouter();

  const [routerParams, setRouterParams] = useState<FilterObjType>({
    category:
      query.category == undefined
        ? []
        : Array.isArray(query.category)
        ? query.category
        : [query.category],
    currency: "USD",
    from:
      query.from == undefined
        ? ""
        : Array.isArray(query.from)
        ? query.from[0]
        : query.from,
    to:
      query.to == undefined
        ? ""
        : Array.isArray(query.to)
        ? query.to[0]
        : query.to,
    name: !query.name
      ? ""
      : Array.isArray(query.name)
      ? query.name[0]
      : query.name,
  });

  const queryParamsStr = (paramsObj: FilterObjType): string => {
    let result = "?";
    if (paramsObj.name != "") {
      result += `name=${paramsObj.name}&`;
    }
    if (paramsObj.category) {
      if (paramsObj.category.length != 0) {
        paramsObj.category.forEach((option, index) => {
          result += `category=${option}&`;
        });
      }
    }
    if (paramsObj.currency) {
      result += `currency=${"USD"}&`;
    }
    if (paramsObj.from != "") {
      result += `from=${paramsObj.from}&`;
    }
    if (paramsObj.to != "") {
      result += `to=${paramsObj.to}&`;
    }

    result = result.slice(0, result.length - 1);
    return result;
  };

  useEffect(() => {
    if (JSON.stringify(query) !== JSON.stringify(routerParams)) {
      let url = "http://localhost:3000/store";
      const params = queryParamsStr(routerParams);
      push(url + params, undefined, { shallow: true });
    }
  }, [routerParams]);

  return (
    <>
      <div className="flex flex-1 flex-col w-full  bg-neutral-800 text-[#fff]">
        <div className="w-full h-fit">
          <button className="px-[20px] py-[10px] w-full flex justify-between rounded-[6px]">
            <span className="font-[500]">Product name</span>
          </button>
          <div className="px-[20px]">
            <input
              className="w-full py-[5px] rounded-[3px] pl-[15px] pr-[5px] bg-neutral-700 outline-none"
              type={"text"}
              value={routerParams["name"]}
              onChange={(e) => {
                setRouterParams((prev) => {
                  const copy = { ...prev };
                  copy.name = e.target.value;
                  return copy;
                });
              }}
            />
          </div>
        </div>
        <div className="w-full h-fit">
          <button className="px-[20px] py-[10px] w-full flex justify-between rounded-[6px]">
            <span className="font-[500]">Price range</span>
          </button>
          <div className="flex px-[20px]">
            <input
              className="w-full py-[5px] rounded-[3px] pl-[15px] pr-[5px] bg-neutral-700 outline-none"
              type={"text"}
              value={routerParams["from"]}
              onChange={(e) => {
                setRouterParams((prev) => {
                  const copy = { ...prev };
                  copy.from = removeLetters(e.target.value);
                  return copy;
                });
              }}
            />
            <strong className="px-[10px]">-</strong>
            <input
              className="w-full rounded-[3px] pl-[15px] pr-[5px] py-[5px]  bg-neutral-700 outline-none"
              type={"text"}
              value={routerParams["to"]}
              onChange={(e) => {
                setRouterParams((prev) => {
                  const copy = { ...prev };
                  copy.to = removeLetters(e.target.value);
                  return copy;
                });
              }}
            />
          </div>
        </div>
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
                          name.toLowerCase()
                        );
                      })
                    }
                  >
                    <input
                      className=""
                      type="checkbox"
                      defaultChecked={routerParams.category.includes(
                        name.toLowerCase()
                      )}
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
