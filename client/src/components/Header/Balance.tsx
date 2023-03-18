import React from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const { user } = useSelector((state: any) => state.global);

  return (
    <>
      <div className="h-[41px] text-[14px] font-[500] border rounded-[4px] px-[12px] cursor-pointer flex items-center relative border-neutral-800">
        Balance:
        <span className="ml-[10px]">{user.balance} $</span>
      </div>
    </>
  );
};

export default Balance;
