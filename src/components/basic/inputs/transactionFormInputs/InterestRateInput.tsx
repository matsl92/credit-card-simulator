import { FormControl, InputLabel, InputAdornment, OutlinedInput } from "@mui/material";

function TransactionInterestRateInput() {
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
            />
        </FormControl>
    )
}

export default TransactionInterestRateInput;

