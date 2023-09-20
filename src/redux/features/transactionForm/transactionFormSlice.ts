import { createSlice } from '@reduxjs/toolkit';
import { TransactionJSON } from '@src/utils/utils';

const initialState: Omit<TransactionJSON, "interestsToBePaid"> = {
    date: new Date().toISOString(),
    type: 'purchase',
    description: '',
    installments: 1,
    interestRate: 3.1214,
    amount: 0,
};

const transactionFormSlice = createSlice({
    name: 'transactionForm',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = (new Date(action.payload)).toISOString();
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

export const { setDate, setType, setDescription, setInstallments, setInterestRate, setAmount } = transactionFormSlice.actions;
export default transactionFormSlice.reducer;
