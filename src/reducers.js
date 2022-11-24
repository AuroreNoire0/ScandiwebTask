import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_FAIL,
  CURRENT_CATEGORY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "./constants";

export const getCategories = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload, login: true };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setCurrentCategory = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_CATEGORY:
      return { name: action.payload };
    default:
      return state;
  }
};

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cart: action.payload };
    case REMOVE_FROM_CART:
      return { cart: action.payload };
    default:
      return state;
  }
};
