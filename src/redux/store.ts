import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '@redux/features/counter/counterSlice';
import formReducer from '@redux/features/form/formSlice';
import dbReducer from '@redux/features/db/dbSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        form: formReducer,
        db: dbReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;