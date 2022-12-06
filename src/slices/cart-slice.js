import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload.product;
      const attributesSelected = action.payload.attributesSelected;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.attributesSelected) ===
            JSON.stringify(attributesSelected)
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          brand: newItem.brand,
          name: newItem.name,
          attributes: newItem.attributes,
          gallery: newItem.gallery,
          quantity: 1,
          prices: newItem.prices,
          attributesSelected: attributesSelected,
        });
      } else {
        existingItem.quantity++;
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
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            item.id !== removeItem.id ||
            JSON.stringify(item.attributesSelected) !==
              JSON.stringify(attributesSelected)
        );
      } else {
        existingItem.quantity--;
      }
    },
    checkOut(state) {
      return (state = { items: [], totalQuantity: 0 });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
