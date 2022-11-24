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
      const attributes = action.payload.attributes;
      console.log(action.payload);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem || existingItem.attributes !== attributes) {
        state.items.push({
          id: newItem.id,
          brand: newItem.brand,
          name: newItem.name,
          attributes: attributes,
          gallery: newItem.gallery,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const removeItemId = action.payload;
      const existingItem = state.items.find((item) => item.id === removeItemId);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removeItemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          existingItem.totalPrice - existingItem.price[0].amount;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
