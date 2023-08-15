import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';

function TransactionDateInput() {
    return (
        <FormControl
            sx={{ m: 1, width: '18ch' }}
            variant="outlined">
		    <DatePicker
                label="Date"
                defaultValue={dayjs(new Date().toLocaleDateString())}
                />
        </FormControl>
    )
}

export default TransactionDateInput;