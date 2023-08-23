import { Paper, Typography, Stack, Box } from "@mui/material";

export interface CycleBillInterface {
    dueDate: Date | string,
    interestsFromPrevDebt: number,
    cycleInterests: number,
    addressableAmount: number,
    minimumPayment: number,
    carriedOverBalance: number,
    fullPayment: number
}

function CycleBill({
    // dueDate,
    interestsFromPrevDebt,
    cycleInterests,
    addressableAmount,
    minimumPayment,
    carriedOverBalance,
    fullPayment,
    ...rest
}: CycleBillInterface) {
    
    let dueDate = rest.dueDate instanceof Date? rest.dueDate : new Date(rest.dueDate)
    
    return (
        <Paper elevation={2} sx={{
            maxWidth: '400px',
            borderRadius: '12px',
        }}>
            <Box padding={3}>
                <Stack spacing={2}>
                    <Stack alignItems='center'>
                        <Typography variant="h5" align="center" sx={{py: '20px'}}>
                            Cycle bill
                        </Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Due date: </Typography>
                        <Typography variant="body2">{dueDate.toLocaleDateString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Interests from prev debt: </Typography>
                        <Typography variant="body2">{Math.round(interestsFromPrevDebt).toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Cycle interests: </Typography>
                        <Typography variant="body2">{Math.round(cycleInterests).toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Addressable amount: </Typography>
                        <Typography variant="body2">{Math.round(addressableAmount).toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Minimum payment: </Typography>
                        <Typography variant="body2">{Math.round(minimumPayment).toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Carried over balance: </Typography>
                        <Typography variant="body2">{Math.round(carriedOverBalance).toLocaleString()}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="body2">Full payment: </Typography>
                        <Typography variant="body2">{Math.round(fullPayment).toLocaleString()}</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    )
}

export default CycleBill;