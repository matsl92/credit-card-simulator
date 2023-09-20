import { TextField, FormControl } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setDescription } from "@src/redux/features/transactionForm/transactionFormSlice";

function TransactionDescriptionInput() {

    const description = useAppSelector(state => state.transactionForm.description);
    const dispatch = useAppDispatch();

    return (
        <FormControl sx={{ m: 1, width: '28ch' }}>
            <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            value={description}
            onChange={e => dispatch(setDescription(e.target.value))}
            />
        </FormControl>
    )
}

export default TransactionDescriptionInput;