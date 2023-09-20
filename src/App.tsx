import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import CreditCardFranchiseInput from '@components/basic/inputs/creditCardForm/FranchiseInput';
// import CreditCardVariantInput from '@components/basic/inputs/creditCardForm/VariantInput';
// import CreditCardNameInput from '@components/basic/inputs/creditCardForm/NameInput';
// import CreditCardInterestRateInput from '@components/basic/inputs/creditCardForm/InterestRateInput';

import ReadCreditCardPage from './pages/ReadCreditCardPage';

function App() {

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container maxWidth="xl">
				<ReadCreditCardPage />
				{/* <CreditCardFranchiseInput />
				<CreditCardVariantInput />
				<CreditCardNameInput />
				<CreditCardInterestRateInput /> */}
			</Container>
		</LocalizationProvider>
	)
}

export default App
