import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload.product;
      const attributesSelected = action.payload.attributesSelected;
      console.log(newItem);
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.attributesSelected) ===
            JSON.stringify(attributesSelected)
      );
      state.totalQuantity++;
      state.totalPrice += newItem.prices[0]
        ? newItem.prices[0].amount
        : newItem.prices;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          brand: newItem.brand,
          name: newItem.name,
          attributes: newItem.attributes,
          gallery: newItem.gallery,
          quantity: 1,
          prices: newItem.prices[0].amount
            ? newItem.prices[0].amount
            : newItem.prices,
          totalPrice: newItem.prices[0].amount,
          attributesSelected: attributesSelected,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const removeItem = action.payload.product;
      const attributesSelected = action.payload.attributesSelected;
      const existingItem = state.items.find(
        (item) =>
          item.id === removeItem.id &&
          JSON.stringify(item.attributesSelected) ===
            JSON.stringify(attributesSelected)
      );
      state.totalQuantity--;
      state.totalPrice -= existingItem.prices[0]
        ? existingItem.prices[0].amount
        : existingItem.prices;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            item.id !== removeItem.id ||
            JSON.stringify(item.attributesSelected) !==
              JSON.stringify(attributesSelected)
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          existingItem.totalPrice - existingItem.prices[0]
            ? existingItem.prices[0].amount
            : existingItem.prices;
      }
      console.log(current(state));
    },
    checkOut(state) {
      return state = { items: [], totalQuantity: 0, totalPrice: 0 };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
