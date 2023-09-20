import { createSlice } from '@reduxjs/toolkit';
import { TransactionJSON } from '@src/utils/utils';

const initialState: { transactions: Omit<TransactionJSON, "interestsToBePaid">[] } = {
    transactions: [
        {
            date: new Date().toISOString(),
            type: 'purchase',
            description: 'Saturday night meal',
            installments: 2,
            interestRate: 3.1214,
            amount: 200000
        },
        {
            date: new Date().toISOString(),
            type: 'purchase',
            description: 'Pizza for my family',
            installments: 3,
            interestRate: 3.1214,
            amount: 150000
        },
        {
            date: new Date().toISOString(),
            type: 'purchase',
            description: 'Diner with my g',
            installments: 3,
            interestRate: 3.1214,
            amount: 300000
        },
    ]
};

export const dbSlice = createSlice({
    name: 'db',
    initialState,
    reducers: {
        insert: (state, action) => {
            state.transactions.unshift(action.payload);
        },
        remove: (state, action) => {
            state.transactions.splice(action.payload, 1);
        }
    }
})

export const { insert, remove } = dbSlice.actions;
export default dbSlice.reducer;