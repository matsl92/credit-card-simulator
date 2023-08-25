import CycleTransactionBalanceContainer, { CycleTransactionContainerInterface } from "./CycleTransactionBalanceContainer";
import CycleBill, { CycleBillInterface } from "@components/basic/CycleBill";
import SubtotalBar, { SubtotalBarInterface } from "@components/basic/SubtotalBar";

interface CycleInterface extends 
CycleTransactionContainerInterface,
SubtotalBarInterface,
CycleBillInterface {};

export interface CycleContainerInterface2 {
    cycles: Array<CycleInterface>
};

// export interface CycleContainerInterface {
//     cycles: Array<{
//         // CycleTransactionContainerInterface
//         cycle: number,
//         cycleStart: Date | string,
//         cycleEnd: Date | string,
//         interestRate: number,
//         transactionBalances: { 
//             // TransactionBalanceInterface included in CycleTraConInt...
//             transactionDate: Date | string,
//             installments: { n: number, of: number},
//             paidCapital: number,
//             paidInterests: number,
//             remainingCapital: number,
//             remainingInterests: number
//         }[],
//         subTotal: {
//             // SubtotalBarInterface
//             paidCapital: number,
//             paidInterests: number,
//             remainingCapital: number,
//             remainingInterests: number
//         },
//         cycleBill: {
//             // CycleBillInterface
//             dueDate: Date | string,
//             interestsFromPrevDebt: number,
//             cycleInterests: number,
//             addressableAmount: number,
//             minimumPayment: number,
//             carriedOverBalance: number,
//             fullPayment: number
//         }
//     }>
// }

export interface CycleContainerInterface {
     transactionBalanceContainer: Array<{
        cycle: number,
        cycleStart: Date | string,
        cycleEnd: Date | string,
        interestRate: number,
        transactionBalances: Array<{
            transactionDate: Date | string,
            installments: { n: number, of: number},
            paidCapital: number,
            paidInterests: number,
            remainingCapital: number,
            remainingInterests: number
        }>,
        paidCapital: number,
        paidInterests: number,
        remainingCapital: number,
        remainingInterests: number,
        dueDate: Date | string,
        interestsFromPrevDebt: number,
        cycleInterests: number,
        addressableAmount: number,
        minimumPayment: number,
        carriedOverBalance: number,
        fullPayment: number
    }>
}


export default function CycleContainer(props: CycleContainerInterface) {

    return (
        <>
            {
                props.cycles.map((cycle, index) => (
                    <div key={index}>
                        <CycleTransactionBalanceContainer 
                        {...cycle}
                        />
                        <SubtotalBar 
                        paidCapital={333}
                        paidInterests={333}
                        remainingCapital={333}
                        remainingInterests={333}
                        />
                        <CycleBill 
                        {...cycle}
                        />
                    </div>
                ))
            }
        </>
    );
}
