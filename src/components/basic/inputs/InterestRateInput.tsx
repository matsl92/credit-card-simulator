import { FormControl, InputLabel, InputAdornment, OutlinedInput } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setInterestRate } from "@src/redux/features/form/formSlice";

function TransactionInterestRateInput() {

    const interestRate = useAppSelector(state => state.form.interestRate);
    const dispatch = useAppDispatch();

    function handleChange(value: string): string {
        if (value === "") {
            return "0";
        }  else if (
            value.at(0) === "0" && 
            value.at(1) !== "." &&
            value.at(1) !== undefined
            ) {
            return value.slice(1);
        }
        return value;
    }

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
            onChange={e => dispatch(setInterestRate(handleChange(e.target.value)))}
            />
        </FormControl>
    )
}

export default TransactionInterestRateInput;

