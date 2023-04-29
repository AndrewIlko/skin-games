import { createSlice } from "@reduxjs/toolkit";
import { initialStateGlobal } from "@/ts/types/redux_types";

const initialState: initialStateGlobal = {
  user: null,
  favGames: [],
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
        result = [...state.favGames, ...action.payload];
        state.favGames = result;
      } else {
        result = [...state.favGames, action.payload];
        state.favGames = result;
      }
      localStorage.setItem("favGames", JSON.stringify(result));
    },
    removeFavGames: (state, action) => {
      const data = action.payload;
      let result;
      if (Array.isArray(data)) {
        result = state.favGames.filter((id) => data.indexOf(id) != -1);
        state.favGames = result;
      } else {
        result = state.favGames.filter((id) => id != data);
        state.favGames = result;
      }
      localStorage.setItem("favGames", JSON.stringify(result));
    },
  },
});

export const globalAction = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
