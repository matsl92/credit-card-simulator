import { Grid, Typography, Box } from "@mui/material"

export interface TransactionBalanceInterface {
    transactionDate: Date | string,
    installments: { n: number, of: number},
    paidCapital: number,
    paidInterests: number,
    remainingCapital: number,
    remainingInterests: number
}

function TransactionBalance(props: TransactionBalanceInterface) {
    const { 
        // transactionDate,
        installments: { n, of},
        paidCapital, 
        paidInterests, 
        remainingCapital, 
        remainingInterests,
        ...rest 
    } = props;

    let transactionDate = rest.transactionDate instanceof Date? rest.transactionDate : new Date(rest.transactionDate);

    return (
        <Grid container columns={16} sx={{
            width: '95%',
            paddingY: '10px',
            marginX: 'auto',
            borderTop: '1px solid rgb(228, 228, 228)',
        }}>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{transactionDate.toLocaleDateString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='center'>{n+'/'+of}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(paidCapital).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(paidInterests).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(paidCapital + paidInterests).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(remainingCapital).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(remainingInterests).toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid md={2} sm={2} lg={2} item>
                <Box sx={{paddingX: '10px'}}>
                    <Typography variant='body2' align='right'>{Math.round(remainingCapital + remainingInterests).toLocaleString()}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default TransactionBalance;