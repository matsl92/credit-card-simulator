import TableHeaders from "@components/basic/TableHeaders";
import Transaction, { TransactionInterface } from "@components/basic/Transaction";
import { Paper, Typography } from "@mui/material";
import FormContainer from "@components/basic/FormContainer";

interface TransactionContainerInterface {
    transactions: TransactionInterface[]
}

function TransactionContainer({ transactions }: TransactionContainerInterface) {
    return (
        <Paper elevation={2} sx={{
            width: '1050px', 
            borderRadius: '12px',
            marginX: 'auto',
            py: "10px"
        }}>
            <Typography variant="h5" align="center" sx={{py: '20px'}}>
                Transactions
            </Typography>

            <TableHeaders headers={[
                {string: 'Date'},
                {string: 'Type'},
                {string: 'Description', columns: 2},
                {string: 'Installments'},
                {string: 'Interest rate'},
                {string: 'Amount'},
                {string: 'Interests to pay'}
            ]}/>

            {transactions.map((transaction, index) => {
                return <Transaction 
                    key={index}
                    date={transaction.date}
                    type={transaction.type}
                    description={transaction.description}
                    installments={transaction.installments}
                    interestRate={transaction.interestRate}
                    amount={transaction.amount}
                    interestsToBePaid={transaction.interestsToBePaid}/>
            })}
            
            <FormContainer />
        </Paper>
    )
}

export default TransactionContainer;