import TransactionTypeInput from "@components/basic/inputs/transactionForm/TypeInput";
import TransactionDateInput from "@components/basic/inputs/transactionForm/DateInput";
import TransactionDescriptionInput from "@components/basic/inputs/transactionForm/DescriptionInput";
import TransactionInstallmentsInput from "@components/basic/inputs/transactionForm/InstallmentsInput";
import CreditCardInterestRateInput from "@components/basic/inputs/creditCardForm/InterestRateInput";
import TransactionAmountInput from "@components/basic/inputs/transactionForm/AmountInput";

export function TransactionForm() {

    return (
        <form style={{ display: 'flex', justifyContent: 'center' }}>
            <TransactionDateInput />
            <TransactionTypeInput />
            <TransactionDescriptionInput />
            <TransactionInstallmentsInput />
            <CreditCardInterestRateInput />
            <TransactionAmountInput />
        </form>
    )
}

export default TransactionForm;