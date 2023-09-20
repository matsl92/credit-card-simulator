import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { setType } from '@src/redux/features/transactionForm/transactionFormSlice';

export default function TransactionTypeInput() {

  const type = useAppSelector(state => state.transactionForm.type);
  const dispatch = useAppDispatch();

  return (
    <FormControl sx={{ m: 1, width: '15ch' }} size="medium">
      <InputLabel id="demo-select-label">Type</InputLabel>
      <Select
        labelId="demo-select-label"
        id="demo-select-small"
        value={type}
        label="Type"
        onChange={e => dispatch(setType(e.target.value))}
        size="medium"
      >
        <MenuItem value="">
          {/* <em>None</em> */}
        </MenuItem>
        <MenuItem value="advance">Advance</MenuItem>
        <MenuItem value="purchase">Purchase</MenuItem>
        <MenuItem value="payment">Payment</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  );
}