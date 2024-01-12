import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import getDataFromLS from '../../utils/getDataFromLS';
import calcTotalPrice from '../../utils/calcTotalPrice';
import calcTotalCount from '../../utils/calcTotalCount';

const { items, totalPrice, totalCount } = getDataFromLS();

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    totalCount: totalCount,
    items: items,
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CartItem>) {
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

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
        removeProduct(state, action: PayloadAction<string>) {
            const checkProduct = state.items.find(
                (product) => product.id === action.payload,
            );

            if (checkProduct && checkProduct.count > 1) {
                checkProduct.count--;
            } else {
                return;
            }

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (product) => product.id !== action.payload,
            );

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
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

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
    state.cart.items.find((product: CartItem) => product.id === id);
