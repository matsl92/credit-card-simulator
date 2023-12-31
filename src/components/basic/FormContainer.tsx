import * as React from 'react';
import TransactionForm from '@components/basic/TransactionForm';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import { 
	Box,
	Collapse,
	Button,
} from '@mui/material';
import { serializeTransaction, TransactionJSON } from '@src/utils/utils';
import { useAppSelector, useAppDispatch } from '@src/redux/hooks';
import { insert } from '@src/redux/features/db/dbSlice';
import { Transaction } from '@src/utils/utils';

function FormContainer() {
	
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const dispatch = useAppDispatch();
	
	const formData: Omit<TransactionJSON, "interestsToBePaid"> = useAppSelector(state => state.transactionForm);

	const transaction = new Transaction(
		formData.date,
		formData.type,
		formData.description,
		formData.installments,
		formData.interestRate,
		formData.amount
	);

	const serializedTransaction = serializeTransaction(transaction);

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			// backgroundColor: "rgb(200, 200, 200)",
			paddingY: '10px'
		}}>
			<Box>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<Box>
						<TransactionForm />
					</Box>
					<Box sx={{ display: 'flex', justifyContent: "end"}}>
						<Button 
						color='success'
						endIcon={<SaveIcon />} 
						sx={{marginX: '8px'}}
						variant='outlined'
						onClick={() => {
							dispatch(insert({
								...serializedTransaction
							}));
							setExpanded(!expanded);
						}}>
							<span>save</span>
						</Button>
					</Box>
				</Collapse>
			</Box>
			<Box>
				<Button
				color={expanded? 'primary' : 'success'}
				size="medium"
				aria-label='Add transaction'
				onClick={handleExpandClick}
				endIcon={ expanded? <RemoveIcon color='primary' /> : <AddIcon color="success" /> }
				variant="outlined">
					<span>{expanded? 'omit' : 'add'}</span>
				</Button>
			</Box>
		</Box>
	);
}

export default FormContainer;