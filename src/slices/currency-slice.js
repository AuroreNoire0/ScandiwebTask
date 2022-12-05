import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    label: JSON.parse(localStorage.getItem("currency")).label,
    symbol: JSON.parse(localStorage.getItem("currency")).symbol,
    dropdown: false,
  },
  reducers: {
    changeCurrency(state, action) {
      console.log(action.payload);
      state.label = action.payload.label;
      state.symbol = action.payload.symbol;
    },
    toggleDropdown(state, action) {
      state.dropdown = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
