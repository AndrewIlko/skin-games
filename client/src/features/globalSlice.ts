import { createSlice } from "@reduxjs/toolkit";
import { initialStateGlobal } from "@/ts/types/redux_types";

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
      let result;
      if (Array.isArray(data)) {
        result = [...state.cart, ...data];
      } else {
        result = [...state.cart, data];
      }
      state.cart = result;
      localStorage.setItem("cart", JSON.stringify(result));
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
