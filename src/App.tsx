import Container from '@mui/material/Container';
import TransactionContainer from '@components/complex/TransactionContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Divider } from '@mui/material';
import { useAppSelector } from "@src/redux/hooks";
import Outlook from '@components/complex/Outlook';
import { decomposeTransactionAndAddBalancesToOutlook, enumerateCyclesInOutlook, CycleDescriptor } from './utils/utils';
import { OutlookInterface } from '@components/complex/Outlook';
import { CycleInterface } from '@components/complex/Cycle';
import { Transaction } from '@src/utils/utils';

function App() {

	const transactions = useAppSelector(state => state.db.transactions);
	const cycleMap: Map<CycleDescriptor, CycleInterface> = new Map;

	const outlook: OutlookInterface = {
		cycles: [],
		totalBar: {
			paidCapital: 0,
			paidInterests: 0
    	}
	}; 

	for (let transaction of transactions) {
		decomposeTransactionAndAddBalancesToOutlook(
			new Transaction(
				transaction.date,
				transaction.type,
				transaction.description,
				transaction.installments,
				transaction.interestRate,
				transaction.amount
			), 
			cycleMap, 
			outlook
		)
	}

	enumerateCyclesInOutlook(outlook);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container maxWidth="xl">
				<TransactionContainer
				transactions={transactions}/>
				<Divider sx={{marginY: '20px'}}></Divider>
				<Outlook {...outlook}/>
			</Container>
		</LocalizationProvider>
	)
}

export default App
