import Container from '@mui/material/Container';
import TransactionContainer from '@components/complex/TransactionContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Divider } from '@mui/material';
import { useAppSelector } from "@src/redux/hooks";
import exampleData from '@src/utils/TransactionDataExample.json';


// import CycleContainer from '@components/complex/Cycle';
import Outlook from '@components/complex/Outlook';

function App() {

	const transactions = useAppSelector(state => state.db.transactions);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container maxWidth="xl">
				<TransactionContainer
					transactions={transactions}/>

				<Divider sx={{marginY: '20px'}}></Divider>

				{/* <CycleContainer 
				{...exampleData}
				/> */}

				<Outlook {...exampleData}/>
			</Container>
		</LocalizationProvider>
	)
}

export default App
