import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

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
	const [values, setValues] = React.useState<State>({
		numberformat: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
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