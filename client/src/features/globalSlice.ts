import { createSlice } from "@reduxjs/toolkit";
import { initialStateGlobal } from "@/ts/types/redux_types";

const initialState: initialStateGlobal = {
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const globalAction = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
