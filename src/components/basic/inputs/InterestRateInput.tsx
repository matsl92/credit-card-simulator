import { FormControl, InputLabel, InputAdornment, OutlinedInput } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setInterestRate } from "@src/redux/features/form/formSlice";

function TransactionInterestRateInput() {

    const interestRate = useAppSelector(state => state.form.interestRate);
    const dispatch = useAppDispatch();

    return (
        <FormControl 
            sx={{ m: 1, width: '18ch' }} 
            variant="outlined">
          <InputLabel htmlFor="outlined-adornment-interest-rate">Interest rate</InputLabel>
          <OutlinedInput
            id="outlined-adornment-interest-rate"
            type={'number'}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Interest rate"
            value={interestRate}
            onChange={e => dispatch(setInterestRate(e.target.value))}
            />
        </FormControl>
    )
}

export default TransactionInterestRateInput;

