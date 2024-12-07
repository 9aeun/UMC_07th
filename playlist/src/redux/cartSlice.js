import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    increase: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalQuantity = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.amount;
        totalQuantity += item.amount;
      });
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
  },
});

export const { setCartItems, increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
