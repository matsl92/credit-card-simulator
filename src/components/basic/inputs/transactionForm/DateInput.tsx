import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { setDate } from '@src/redux/features/transactionForm/transactionFormSlice';

function TransactionDateInput() {

    const date = useAppSelector(state => state.transactionForm.date);
    const dispatch = useAppDispatch();

    return (
        <FormControl
            sx={{ m: 1, width: '18ch' }}
            variant="outlined">
		    <DatePicker
                label="Date"
                value={dayjs(date)}
                onChange={newValue => dispatch(setDate(newValue?.toDate().toUTCString()))}
                />
        </FormControl>
    )
}

export default TransactionDateInput;