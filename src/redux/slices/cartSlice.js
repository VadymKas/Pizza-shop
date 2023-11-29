import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProduct(state, action) {
      const checkProduct = state.items.find(
        (product) => product.id === action.payload.id,
      );

      if (checkProduct) {
        checkProduct.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (sum, product) => sum + product.price * product.count,
        0,
      );
      state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0);
    },
    removeProduct(state, action) {
      const checkProduct = state.items.find(
        (product) => product.id === action.payload,
      );

      if (checkProduct && checkProduct.count > 1) {
        checkProduct.count--;
      } else {
        state.items = state.items.filter(
          (product) => product.id !== action.payload,
        );
      }

      state.totalPrice = state.items.reduce(
        (sum, product) => sum + product.price * product.count,
        0,
      );
      state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0);
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.id !== action.payload,
      );

      state.totalPrice = state.items.reduce(
        (sum, product) => sum + product.price * product.count,
        0,
      );
      state.totalCount = state.items.reduce((acc, item) => acc + item.count, 0);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, removeProduct, deleteProduct, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
export const cartItemByIdSelector = (id) => (state) =>
  state.cart.items.find((product) => product.id === id);
