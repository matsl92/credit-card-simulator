import { TextField, FormControl } from "@mui/material";
function TransactionDescriptionInput() {
    return (
        <FormControl sx={{ m: 1, width: '28ch' }}>
            <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            />
        </FormControl>
    )
}

export default TransactionDescriptionInput;