import { createSlice } from "@reduxjs/toolkit";
import { initialStateGlobal } from "@/ts/types/redux_types";
import { CartItemType } from "@/ts/types/app_types";

const initialState: initialStateGlobal = {
  user: null,
  favGames: [],
  cart: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavGames: (state, action) => {
      const data = action.payload;
      let result;

      if (Array.isArray(data)) {
        result = [...state.favGames, ...data];
      } else {
        result = [...state.favGames, data];
      }
      state.favGames = result;
      localStorage.setItem("favGames", JSON.stringify(result));
    },
    removeFavGames: (state, action) => {
      const data = action.payload;
      let result;
      if (Array.isArray(data)) {
        result = state.favGames.filter((id) => data.indexOf(id) != -1);
      } else {
        result = state.favGames.filter((id) => id != data);
      }
      state.favGames = result;
      localStorage.setItem("favGames", JSON.stringify(result));
    },
    addToCart: (state, action) => {
      const data = action.payload;
      const cartItem = state.cart.find((item) => item._id == data._id);

      if (cartItem) {
        cartItem.count++;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const data = action.payload;
      const cartItem: CartItemType | undefined = state.cart.find(
        (item) => item._id == data._id
      );
      if (cartItem!.count == 1) {
        state.cart = state.cart.filter((item) => item._id != data._id);
      } else {
        cartItem!.count--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
