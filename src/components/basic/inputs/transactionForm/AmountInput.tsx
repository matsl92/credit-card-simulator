import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { setAmount } from '@src/redux/features/transactionForm/transactionFormSlice';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				thousandSeparator
				valueIsNumericString
				prefix="$"
			/>
		);
	},
);

interface State {
	numberformat: string;
}

function TransactionAmountInput() {
	const dispatch = useAppDispatch();
	const amountFromRedux = useAppSelector((state) => state.transactionForm.amount); // Assuming the slice is named 'transactionForm'

	const [values, setValues] = React.useState<State>({
		numberformat: amountFromRedux.toString(), // Convert the number to a string
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		// Update local state
		setValues({
			...values,
			[event.target.name]: inputValue,
		});

		// Convert string input to a number and update Redux state
		const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, '')); // Remove formatting characters
		dispatch(setAmount(numericValue)); // Dispatch the action to update the Redux state
	};

	return (
		<FormControl sx={{ m: 1, width: '18ch' }}>
			<TextField
				label="Amount"
				value={values.numberformat}
				onChange={handleChange}
				name="numberformat"
				id="formatted-numberformat-input"
				InputProps={{
					inputComponent: NumericFormatCustom as any,
				}}
				variant="outlined"
			/>
		</FormControl>
	);
}

export default TransactionAmountInput;