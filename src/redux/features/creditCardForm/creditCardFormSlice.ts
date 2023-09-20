import { createSlice } from "@reduxjs/toolkit";
import { CreditCardInterface } from "@components/basic/CreditCard";

const initialState: CreditCardInterface = {
    variant: 0,
    interestRate: 0,
    name: "",
    franchise: "visa"
}

const creditCardFormSlice = createSlice({
    name: "creditCardForm",
    initialState,
    reducers: {
        setVariant: (state, action) => {
            state.variant = action.payload;
        },
        setInterestRate: (state, action) => {
            state.interestRate = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setFranchise: (state, action) => {
            state.franchise = action.payload;
        }
    }
})

export const { setVariant, setName, setInterestRate, setFranchise } = creditCardFormSlice.actions;
export default creditCardFormSlice.reducer;