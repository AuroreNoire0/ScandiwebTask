import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import cartSlice from "./slices/cart-slice";
import currencySlice from "./slices/currency-slice";

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      cart: cartSlice.reducer,
      currency: currencySlice.reducer,
    },
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
