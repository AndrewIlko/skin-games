import { useSelector } from "react-redux";

import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { globalActions } from "@/features/globalSlice";
import useDetectLeave from "@/custom_hooks/useDetectLeave";

const AccountNav = () => {
  const { user } = useSelector((state: any) => state.global);
  const { setUser } = globalActions;
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);

  const accountNav = useRef();

  useDetectLeave(accountNav, () => {
    setIsDropDown(false);
  });

  return (
    <>
      <div
        ref={accountNav}
        className="flex items-center gap-[10px] w-[80px] h-[41px] bg-neutral-800 rounded-[4px] px-[8px] cursor-pointer relative"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <div className="pointer-events-none">
          <img className="w-[32px] rounded-full" src={user.image} />
        </div>
        <div className="pointer-events-none">
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="chevron-down"
            className="w-[14px] h-[14px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="white"
              d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
            ></path>
          </svg>
        </div>
        {isDropDown && (
          <div className="w-[190px] z-[50] absolute border bg-neutral-50 top-[60px] rounded-[4px] py-[4px] right-0">
            <div
              className="px-[16px] py-[12px] text-[14px] mx-[4px] font-[500] flex gap-[10px] rounded-[4px]"
              onClick={() => {
                const cookies = new Cookies();
                cookies.remove("jwt_token");
                dispatch(setUser(null));
              }}
            >
              <svg
                className="w-[16px] mt-[1px]"
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="sign-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96zm231.1 19.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L420.8 230H172c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L307.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                ></path>
              </svg>
              Log out
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountNav;
