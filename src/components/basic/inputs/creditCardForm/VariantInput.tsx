import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { setVariant } from '@src/redux/features/creditCardForm/creditCardFormSlice';

export default function CreditCardVariantInput() {

  const variant = useAppSelector(state => state.creditCardForm.variant);
  const dispatch = useAppDispatch();

  return (
    <FormControl sx={{ m: 1, width: '20ch' }} size="medium">
      <InputLabel id="demo-select-label">Variant</InputLabel>
      <Select
        labelId="demo-select-label"
        id="demo-select-small"
        value={variant}
        label="Variant"
        onChange={e => dispatch(setVariant(e.target.value))}
        size="medium"
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
      </Select>
    </FormControl>
  );
}