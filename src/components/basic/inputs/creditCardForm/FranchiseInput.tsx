import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { setFranchise } from '@src/redux/features/creditCardForm/creditCardFormSlice';

export default function CreditCardFranchiseInput() {

  const franchise = useAppSelector(state => state.creditCardForm.franchise);
  const dispatch = useAppDispatch();

  return (
    <FormControl sx={{ m: 1, width: '20ch' }} size="medium">
      <InputLabel id="demo-select-label">Franchise</InputLabel>
      <Select
        labelId="demo-select-label"
        id="demo-select-small"
        value={franchise}
        label="Franchise"
        onChange={e => dispatch(setFranchise(e.target.value))}
        size="medium"
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        <MenuItem value="amex">AMEX</MenuItem>
        <MenuItem value="visa">VISA</MenuItem>
        <MenuItem value="mastercard">Mastercard</MenuItem>
      </Select>
    </FormControl>
  );
}