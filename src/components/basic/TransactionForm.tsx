import TransactionTypeInput from "./inputs/transactionFormInputs/TypeInput";
import TransactionDateInput from "./inputs/transactionFormInputs/DateInput";
import TransactionDescriptionInput from "./inputs/transactionFormInputs/DescriptionInput";
import TransactionInstallmentsInput from "./inputs/transactionFormInputs/InstallmentsInput";
import TransactionInterestRateInput from "./inputs/transactionFormInputs/InterestRateInput";
import TransactionAmountInput from "./inputs/transactionFormInputs/AmountInput";

export function TransactionForm() {

    return (
        <form style={{ display: 'flex', justifyContent: 'center' }}>
            <TransactionDateInput />
            <TransactionTypeInput />
            <TransactionDescriptionInput />
            <TransactionInstallmentsInput />
            <TransactionInterestRateInput />
            <TransactionAmountInput />
        </form>
    )
}

export default TransactionForm;