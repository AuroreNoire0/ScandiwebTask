import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { cartReducer, getCategories, setCurrentCategory } from "./reducers";
import cartSlice from "./cart-slice";
import currencySlice from "./currency-slice";

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  categories: {},
  current: { name: "all" },
  cart: {},
};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      // categories: getCategories,
      // current: setCurrentCategory,
      // cart: cartReducer,
      cart: cartSlice.reducer,
      currency: currencySlice.reducer,
    },
    // preloadedState: initialState,
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
