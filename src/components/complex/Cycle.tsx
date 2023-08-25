import { Paper, Typography, Grid, Stack } from "@mui/material";
import { TransactionBalanceInterface } from "@components/basic/TransactionBalance";
import CycleBill, { CycleBillInterface } from "@components/basic/CycleBill";
import SubtotalBar, { SubtotalBarInterface } from "@components/basic/SubtotalBar";
import TableHeaders from "@components/basic/TableHeaders";
import TransactionBalance from "@components/basic/TransactionBalance";

export interface CycleInterface {
    cycle: number,
    cycleStart: Date | string,
    cycleEnd: Date | string,
    interestRate: number,
    transactionBalances: TransactionBalanceInterface[],
    subtotalBar: SubtotalBarInterface,
    cycleBill: CycleBillInterface
}


export default function Cycle({
    cycle,
    interestRate,
    transactionBalances,
    subtotalBar,
    cycleBill,
    ...rest
}: CycleInterface) {

let cycleStart = rest.cycleStart instanceof Date ? rest.cycleStart : new Date(rest.cycleStart);
let cycleEnd = rest.cycleEnd instanceof Date ? rest.cycleEnd : new Date(rest.cycleEnd);

    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <Paper elevation={2} sx={{
                width: '1050px', 
                borderRadius: '12px',
                marginX: 'auto',
                py: "10px"
            }}>

                {/* Title */}
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
                            {interestRate.toFixed(2)}%
                        </Typography>
                    </Grid>
                </Grid>

                {/* TableHeaders */}
                <TableHeaders 
                headers={[
                    {string: 'Purchase date'},
                    {string: 'Installments'},
                    {string: 'Paid capital'},
                    {string: 'Paid interests'},
                    {string: 'Total paid'},
                    {string: 'Remaining capital'},
                    {string: 'Remaining interests'},
                    {string: 'Remaining total'},
                ]}/>

                {/* TransactionBalances */}
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

                {/* SubtotalBar */}
                <SubtotalBar 
                paidCapital={1200000}
                paidInterests={200000}
                remainingCapital={15000000}
                remainingInterests={4000000}/>
            </Paper>

            <CycleBill {...cycleBill}/>
        </Stack>
    );
}
