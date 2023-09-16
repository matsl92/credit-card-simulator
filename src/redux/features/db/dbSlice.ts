import { createSlice } from '@reduxjs/toolkit';
import { TransactionInterface } from '@components/basic/Transaction';

const initialState: { transactions: TransactionInterface[] } = {
    transactions: [
        // {
        //     date: new Date().toISOString(),
        //     type: 'purchase',
        //     description: 'Saturday night meal',
        //     installments: 3,
        //     interestRate: 3.1214,
        //     amount: 1500,
        //     interestsToBePaid: 400000
        // },
        // {
        //     date: new Date().toISOString(),
        //     type: 'purchase',
        //     description: 'Pizza for my family',
        //     installments: 5,
        //     interestRate: 3.1214,
        //     amount: 1500,
        //     interestsToBePaid: 400000
        // },
        // {
        //     date: new Date().toISOString(),
        //     type: 'purchase',
        //     description: 'Diner with my g',
        //     installments: 7,
        //     interestRate: 3.1214,
        //     amount: 1500,
        //     interestsToBePaid: 400000
        // },
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