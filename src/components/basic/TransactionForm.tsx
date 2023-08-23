import TransactionTypeInput from "@components/basic/inputs/TypeInput";
import TransactionDateInput from "@components/basic/inputs/DateInput";
import TransactionDescriptionInput from "@components/basic/inputs/DescriptionInput";
import TransactionInstallmentsInput from "@components/basic/inputs/InstallmentsInput";
import TransactionInterestRateInput from "@components/basic/inputs/InterestRateInput";
import TransactionAmountInput from "@components/basic/inputs/AmountInput";

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