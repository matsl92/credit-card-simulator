import { Grid, Typography, Box } from '@mui/material';

export interface TransactionInterface {
    // date: Date,
    date: Date | string,
    type: 'advance' | 'purchase' | 'payment' | 'other',
    description: string,
    installments: number,
    interestRate: number,
    amount: number,
    interestsToBePaid: number
}

function Transaction({
    type,
    description,
    installments,
    // interestRate,
    amount,
    interestsToBePaid,
    ...rest
}: TransactionInterface) {

    let date = typeof rest.date === 'string' ? new Date(rest.date) : rest.date;
    let interestRate = Number(rest.interestRate);
    
    return (
        <Grid container columns={16} sx={{
            width: '95%',
            paddingY: '10px',
            marginX: 'auto',
            borderTop: '1px solid rgb(228, 228, 228)',
        }}>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{date.toLocaleDateString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{type[0].toLocaleUpperCase() + type.substring(1)}</Typography>
                </Box>
            </Grid>
            <Grid md={4} sm={4} lg={4} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align="left" noWrap>{description}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{installments}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{interestRate.toFixed(2)}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(amount).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(interestsToBePaid).toLocaleString()}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Transaction;