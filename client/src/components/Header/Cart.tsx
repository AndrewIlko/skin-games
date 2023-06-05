import useDetectLeave from "@/custom_hooks/useDetectLeave";
import { globalActions } from "@/features/globalSlice";
import { CartItemType } from "@/ts/types/app_types";
import {
  faXmark,
  faCircleInfo,
  faPlus,
  faMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const CartSvg = (props: { className?: string }) => {
  const { className } = props;
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className}`}
      >
        <path
          d="M12 12.7499H5.386C5.1498 12.75 4.9212 12.6664 4.74067 12.5139C4.5602 12.3615 4.43953 12.1502 4.4 11.9173L2.642 1.58395C2.60233 1.35119 2.4816 1.13996 2.30113 0.987686C2.12067 0.835406 1.89213 0.7519 1.656 0.751953H1"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M10.75 14.75C10.8881 14.75 11 14.6381 11 14.5C11 14.3619 10.8881 14.25 10.75 14.25"
          stroke="currentColor"
        ></path>
        <path
          d="M10.75 14.75C10.6119 14.75 10.5 14.6381 10.5 14.5C10.5 14.3619 10.6119 14.25 10.75 14.25"
          stroke="currentColor"
        ></path>
        <path
          d="M5.75 14.75C5.88807 14.75 6 14.6381 6 14.5C6 14.3619 5.88807 14.25 5.75 14.25"
          stroke="currentColor"
        ></path>
        <path
          d="M5.75 14.75C5.61193 14.75 5.5 14.6381 5.5 14.5C5.5 14.3619 5.61193 14.25 5.75 14.25"
          stroke="currentColor"
        ></path>
        <path
          d="M4.03141 9.75007H12.0787C12.5247 9.75001 12.9578 9.60094 13.3093 9.32647C13.6608 9.05207 13.9105 8.66801 14.0187 8.23541L14.9854 4.36873C15.0038 4.29499 15.0052 4.21802 14.9895 4.14366C14.9737 4.0693 14.9412 3.99952 14.8944 3.93961C14.8476 3.87971 14.7878 3.83126 14.7194 3.79795C14.6511 3.76465 14.5761 3.74736 14.5001 3.7474H3.01075"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </>
  );
};

const Cart = () => {
  const { cart } = useSelector((state: any) => state.global);
  const { addToCart, removeFromCart } = globalActions;
  const [isShowCart, setIsShowCart] = useState(false);
  const dispatch = useDispatch();

  const cartRef = useRef<HTMLDivElement | null>(null);

  useDetectLeave(cartRef, () => {
    setIsShowCart(false);
  });

  return (
    <>
      <div ref={cartRef} className="relative">
        <div
          onClick={() => {
            setIsShowCart((prev) => !prev);
          }}
          className="rounded-[4px] p-[10px] bg-neutral-800 cursor-pointer"
        >
          <div className="relative">
            <CartSvg className="text-white w-[21px] h-[21px]" />
            {cart.length != 0 && (
              <div className="w-[15px] h-[15px] bg-red-500 rounded-full absolute top-[-6px] right-[-6px] text-[8px] font-[500] text-white flex text-center items-center justify-center">
                {cart.reduce((a: number, b: CartItemType) => a + b.count, 0)}
              </div>
            )}
          </div>
        </div>
        {isShowCart && (
          <div className="w-[300px] absolute right-0 top-[45px] border bg-white shadow-md rounded-[6px] flex flex-col">
            <div className="flex justify-between items-center px-[30px] border-b py-[15px]">
              <span className="font-[500] text-[18px] select-none">
                My shopping cart
              </span>
              <span className="relative flex justify-center items-center">
                <button
                  onClick={() => setIsShowCart(false)}
                  className="px-[15px] pt-[16px] pb-[12px] absolute"
                >
                  <FontAwesomeIcon
                    className="w-[23px] h-[23px]"
                    icon={faXmark}
                  />
                </button>
              </span>
            </div>
            {cart.length == 0 && (
              <>
                <div className="px-[30px] py-[20px] text-center">
                  <div className="flex flex-col items-center gap-[10px]">
                    <FontAwesomeIcon
                      className="w-[40px] h-[40px]"
                      icon={faCircleInfo}
                    />
                    <div className="font-[500] text-[18px]">
                      Your shopping cart is empty
                    </div>
                  </div>
                </div>
              </>
            )}
            {cart.length != 0 && (
              <>
                <div className="flex flex-col flex-1 px-[30px]">
                  {cart.map((item: CartItemType) => {
                    const { _id, name, price, image, count } = item;
                    return (
                      <Fragment key={_id}>
                        <div className="flex flex-col gap-[5px] py-[10px] relative">
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                            className="absolute top-[5px] right-0 hover:text-red-500 transition-all duration-300"
                          >
                            <FontAwesomeIcon
                              className="w-[12px]"
                              icon={faTrash}
                            />
                          </button>
                          <div className="flex gap-[20px]">
                            <img className="w-[100px]" src={image} />
                            <div className="flex flex-col gap-[10px] text-[14px] font-[500]">
                              <div>{name}</div>
                              <div className="flex items-center gap-[6px]">
                                <button
                                  onClick={() => dispatch(removeFromCart(item))}
                                  disabled={count == 1}
                                >
                                  <FontAwesomeIcon
                                    className="w-[8px]"
                                    icon={faMinus}
                                  />
                                </button>
                                <div className="text-[14px]">{count}</div>
                                <button
                                  onClick={() => dispatch(addToCart(item))}
                                >
                                  <FontAwesomeIcon
                                    className="w-[8px]"
                                    icon={faPlus}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-[10px] px-[30px] py-[20px]">
                  <div className="flex items-center">
                    <div className="flex flex-1 font-[500]">Total</div>
                    <div className="text-[30px] font-[500] leading-[24px]">
                      0
                    </div>
                  </div>
                  <button className="px-[10px] py-[10px] bg-neutral-800 rounded-[6px] text-white font-[500]">
                    View cart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
