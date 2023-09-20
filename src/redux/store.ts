import { configureStore } from "@reduxjs/toolkit";
import transactionFormReducer from '@src/redux/features/transactionForm/transactionFormSlice';
import creditCardFormReducer from '@src/redux/features/creditCardForm/creditCardFormSlice';
import counterReducer from '@redux/features/counter/counterSlice';
import dbReducer from '@redux/features/db/dbSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        transactionForm: transactionFormReducer,
        creditCardForm: creditCardFormReducer,
        db: dbReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;