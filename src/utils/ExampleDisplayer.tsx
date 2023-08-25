// import sampleData from './TransactionDataExample.json';

// import { TransactionInterface } from '@components/basic/Transaction';
// import { SubtotalBarInterface } from '@components/basic/SubtotalBar';
// import { CycleBillInterface } from '@components/basic/CycleBill';

import CycleTransactionBalanceContainer from '@components/complex/CycleTransactionBalanceContainer';
import { TotalBarInterface } from '@components/basic/TotalBar';
import { CycleTransactionContainerInterface } from '@components/complex/CycleTransactionBalanceContainer';
import CycleBill from '@components/basic/CycleBill';
import TotalBar from '@components/basic/TotalBar';

// function processTransactions

export interface TransactionOutputSimplified {
    cycles: CycleTransactionContainerInterface[]
    total: TotalBarInterface
}


export interface TransactionOutput {
    cycles: Array<{
        // CycleTransactionContainerInterface
        cycle: number,
        cycleStart: Date | string,
        cycleEnd: Date | string,
        interestRate: number,
        transactionBalances: { // TransactionBalanceInterface included in CycleTraConInt...
            transactionDate: Date | string,
            installments: { n: number, of: number},
            paidCapital: number,
            paidInterests: number,
            remainingCapital: number,
            remainingInterests: number
        }[],
        subTotal: {
            paidCapital: number,
            paidInterests: number,
            remainingCapital: number,
            remainingInterests: number
        },
        cycleBill: {
            // CycleBillInterface
            dueDate: Date | string,
            interestsFromPrevDebt: number,
            cycleInterests: number,
            addressableAmount: number,
            minimumPayment: number,
            carriedOverBalance: number,
            fullPayment: number
        }
    }>,
    total: {
        paidCapital: number,
        paidInterests: number,
    }
}

export default function ExampleDisplayer(props: TransactionOutput) {

    return (
        <>
            {
                props.cycles.map((cycle, index) => (
                    <div key={index}>
                        <CycleTransactionBalanceContainer 
                        cycle={cycle.cycle}
                        cycleStart={cycle.cycleStart}
                        cycleEnd={cycle.cycleEnd}
                        interestRate={cycle.interestRate}
                        transactionBalances={cycle.transactionBalances}
                        />

                        <CycleBill 
                        dueDate={cycle.cycleBill.dueDate}
                        interestsFromPrevDebt={cycle.cycleBill.interestsFromPrevDebt}
                        cycleInterests={cycle.cycleBill.cycleInterests}
                        addressableAmount={cycle.cycleBill.addressableAmount}
                        minimumPayment={cycle.cycleBill.minimumPayment}                    
                        carriedOverBalance={cycle.cycleBill.carriedOverBalance}                    
                        fullPayment={cycle.cycleBill.fullPayment}                    
                        />
                    </div>
                ))
            }

            <TotalBar 
            paidCapital={props.total.paidCapital}
            paidInterests={props.total.paidInterests}
            />
        </>
    )
}