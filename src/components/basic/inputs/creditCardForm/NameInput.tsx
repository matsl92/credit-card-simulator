import { TextField, FormControl } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setName } from "@src/redux/features/creditCardForm/creditCardFormSlice";

export default function CreditCardNameInput() {

    const name = useAppSelector(state => state.creditCardForm.name);
    const dispatch = useAppDispatch();

    return (
        <FormControl sx={{ m: 1, width: '28ch' }}>
            <TextField
            id="outlined-multiline-flexible"
            label="Name"
            multiline
            maxRows={4}
            value={name}
            onChange={e => dispatch(setName(e.target.value))}
            />
        </FormControl>
    )
}