import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload;
        },
        decrementByAmount: (state, action) => {
            state.counter -= action.payload;
        }
    }
})

export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;