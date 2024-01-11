import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<CartItem[], SearchParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, searchCategory, searchName, page } = params;
        const { data } = await axios<CartItem[]>(
            'https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB?' +
                sortBy +
                order +
                searchCategory +
                searchName +
                page,
        );

        return data;
    },
);

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(
                fetchPizzas.fulfilled,
                (state, action) => {
                    state.items = action.payload;
                    state.status = 'success';
                },
            )
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

export const pizzaSelector = (state: RootState) => state.pizza;
