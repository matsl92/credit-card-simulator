import { createSlice } from '@reduxjs/toolkit';

// interface initialStateInterface {
//     date: string,
//     type: 'advance' | 'purchase' | 'payment' | 'other',
//     description: '',
//     installments: number,
//     interestRate: number,
//     amount: number
// }

const initialState = {
    date: new Date().toUTCString(),
    type: 'purchase',
    description: '',
    installments: 1,
    interestRate: 0,
    amount: 75,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = (new Date(action.payload)).toUTCString();
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setInstallments: (state, action) => {
            state.installments = action.payload;
        },
        setInterestRate: (state, action) => {
            state.interestRate = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    }
});

export const { setDate, setType, setDescription, setInstallments, setInterestRate, setAmount } = formSlice.actions;
export default formSlice.reducer;
