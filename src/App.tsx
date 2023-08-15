import Container from '@mui/material/Container';
import CycleTransactionBalanceContainer from '@components/complex/CycleTransactionBalanceContainer';
import TransactionContainer from '@components/complex/TransactionContainer';
// import TotalBar from '@components/basic/TotalBar';
// import CycleBill from '@components/basic/CycleBill';
// import TransactionForm from '@components/basic/TransactionForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Divider } from '@mui/material';


function App() {

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				<TransactionContainer
					transactions={[
						{
							date: new Date(),
							type: 'purchase',
							description: 'Some purchase',
							installments: 24,
							interestRate: 2.9559,
							amount: 1500,
							interestsToBePaid: 400000
						},
						{
							date: new Date(),
							type: 'purchase',
							description: 'Some purchase That I cannnot quite remember',
							installments: 24,
							interestRate: 2.9559,
							amount: 1500,
							interestsToBePaid: 400000
						},
						{
							date: new Date(),
							type: 'purchase',
							description: 'Some purchase That I cannnot quite remember',
							installments: 24,
							interestRate: 2.9559,
							amount: 1500,
							interestsToBePaid: 400000
						},
					]}/>

				<Divider sx={{marginY: '20px'}}></Divider>

				<CycleTransactionBalanceContainer 
					cycle={1}
					cycleStart={new Date()}
					cycleEnd={new Date()}
					interestRate={3.1213}
					transactionBalances={[
						{
							transactionDate: new Date(),
							installments: {n: 4, of: 24},
							paidCapital: 120000,
							paidInterests: 10000,
							remainingCapital: 4000000,
							remainingInterests: 200000
						},
						{
							transactionDate: new Date(),
							installments: {n: 4, of: 24},
							paidCapital: 120000,
							paidInterests: 10000,
							remainingCapital: 4000000,
							remainingInterests: 200000
						},
						{
							transactionDate: new Date(),
							installments: {n: 4, of: 24},
							paidCapital: 120000,
							paidInterests: 10000,
							remainingCapital: 4000000,
							remainingInterests: 200000
						}
					]}/>
				
				{/* <TotalBar 
					paidCapital={19000000}
					paidInterests={4000000}/> */}
				{/* <CycleBill 
					dueDate={new Date()}
					interestsFromPrevDebt={450000}
					cycleInterests={30000}
					addressableAmount={1200000}
					minimumPayment={1800000}
					carriedOverBalance={8000000}
					fullPayment={15000000}/> */}
			</Container>
		</LocalizationProvider>
	)
}

export default App
