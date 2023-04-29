import { CategoryInfoType } from "@/ts/types/app_types";
import Link from "next/link";
import { Fragment } from "react";
import { categoriesIcons } from "@/assets/svg";

const CategoriesTiles = ({
  categories,
}: {
  categories: CategoryInfoType[];
}) => {
  return (
    <>
      <div className="py-[30px]">
        <div className="mt-[10px] mb-[20px] text-[20px] font-[500]">
          Categories
        </div>
        {categories && (
          <>
            <div className="grid grid-cols-3 gap-[20px] laptop:grid-cols-7 800px:grid-cols-5 600px:grid-cols-4">
              {categories.map((category) => {
                const { category: name, games } = category;
                const svgSrc = categoriesIcons[name].src;

                return (
                  <Fragment key={category._id}>
                    <Link
                      href={`/store?category=${name.toLowerCase()}`}
                      className="w-full h-[140px] border rounded-lg flex flex-col shadow-lg justify-between items-center p-[15px] hover:shadow-none transition-shadow duration-300 cursor-pointer bg-neutral-800 text-neutral-100"
                    >
                      <div className="font-[500] text-[13px]">
                        {games.length}
                      </div>
                      <div>
                        <img src={svgSrc} />
                      </div>
                      <div className="font-[500] text-[13px]">{name}</div>
                    </Link>
                  </Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoriesTiles;
