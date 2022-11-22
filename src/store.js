import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { getCategories, setCurrentCategory } from "./reducers";

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  categories: {},
  current: { name: 'all'},
};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      categories: getCategories,
      current: setCurrentCategory,
    },
  },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
