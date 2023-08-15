import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TransactionTypeInput() {
  const [type, setType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: '15ch' }} size="medium">
      <InputLabel id="demo-select-label">Type</InputLabel>
      <Select
        labelId="demo-select-label"
        id="demo-select-small"
        value={type}
        label="Type"
        onChange={handleChange}
        size="medium"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="advance">Advance</MenuItem>
        <MenuItem value="purchase">Purchase</MenuItem>
        <MenuItem value="payment">Payment</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  );
}