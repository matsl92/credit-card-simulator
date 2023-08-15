import { TransactionBalanceInterface } from "@components/basic/TransactionBalance";
import TransactionBalance from "@components/basic/TransactionBalance";
import { Paper, Typography, Grid } from "@mui/material";
import TableHeaders from "@components/basic/TableHeaders";
import SubtotalBar from "@components/basic/SubtotalBar";

interface CycleTransactionContainerInterface {
    cycle: number,
    cycleStart: Date,
    cycleEnd: Date,
    interestRate?: number,
    transactionBalances: Array<TransactionBalanceInterface>
}

function CycleTransactionBalanceContainer({
    cycle,
    cycleStart,
    cycleEnd,
    interestRate,
    transactionBalances
}: CycleTransactionContainerInterface) {
    return (
        <Paper elevation={2} sx={{
            width: '1050px', 
            borderRadius: '12px',
            marginX: 'auto',
            py: "10px"
        }}>
            <Grid container columns={3} sx={{py: '20px'}}>
                <Grid md={1} sm={1} lg={1} item sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end'
                        }}>
                    <Typography align="center">
                        {cycle}
                    </Typography>
                </Grid>
                <Grid md={1} sm={1} lg={1} item >
                    <Typography variant="h5" align="center">
                        {cycleStart.toLocaleDateString()+' - '+cycleEnd.toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid md={1} sm={1} lg={1} item sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end'
                        }}>
                    <Typography align="center">
                        {interestRate?.toFixed(2)}%
                    </Typography>
                </Grid>
            </Grid>
            <TableHeaders headers={[
                {string: 'Purchase date'},
                {string: 'Installments'},
                {string: 'Paid capital'},
                {string: 'Paid interests'},
                {string: 'Total paid'},
                {string: 'Remaining capital'},
                {string: 'Remaining interests'},
                {string: 'Remaining total'},
            ]}/>

            {transactionBalances.map((transaction, index) => {
                return <TransactionBalance 
                    key={index}
                    transactionDate={transaction.transactionDate}
                    installments={transaction.installments}
                    paidCapital={transaction.paidCapital}
                    paidInterests={transaction.paidInterests}
                    remainingCapital={transaction.remainingCapital}
                    remainingInterests={transaction.remainingInterests}/>
            })}
            <SubtotalBar 
                paidCapital={1200000}
                paidInterests={200000}
                remainingCapital={15000000}
                remainingInterests={4000000}/>
        </Paper>
    )
}

export default CycleTransactionBalanceContainer;