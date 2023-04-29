import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { DecodedJWT } from "@/ts/types/app_types";
import { useDispatch } from "react-redux";
import { globalAction } from "@/features/globalSlice";
import { useEffect } from "react";

const Layout = ({ children }: { children: any }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const tokenFromQuery = router.query.jwt;
  const dispatch = useDispatch();
  const { setUser, setFavGames } = globalAction;

  if (tokenFromQuery) {
    try {
      const decode: DecodedJWT = jwt(`${tokenFromQuery}`);
      cookies.set("jwt_token", tokenFromQuery, {
        expires: new Date(decode.exp * 1000),
      });
      console.log("Fuck");
      router.push("/", undefined, { shallow: true });
    } catch (e) {
      console.log("Error", e);
    }
  }

  useEffect(() => {
    const jwt_token = cookies.get("jwt_token");

    if (jwt_token) {
      const decode = jwt(jwt_token);
      dispatch(setUser(decode));
    } else {
      dispatch(setUser(null));
    }
    console.log("Triggered");
  }, [router.asPath]);

  useEffect(() => {
    const favDishes = JSON.parse(localStorage.getItem("favGames") || "[]");
    console.log(favDishes);
    dispatch(setFavGames(favDishes));
  }, []);

  return <div>{children}</div>;
};

export default Layout;
