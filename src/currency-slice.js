import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    label: "Dollar",
    symbol: "$",
  },
  reducers: {
    changeCurrency(state, action) {
      state.currency.label = action.payload.label;
      state.currency.symbol = action.payload.symbol;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;