import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { TransactionInterface } from "@components/basic/Transaction";
import { CycleInterface } from "@components/complex/Cycle";
import { OutlookInterface } from "@components/complex/Outlook";
import { TransactionBalanceInterface } from "@components/basic/TransactionBalance";
dayjs.extend(utc);

export interface CycleDescriptor {
    start: Date,
    billingDate: Date,
    dueDate: Date
}

const variant0 = {
    defaultStart: 30, // UTC
    defaultBillingDate: 30,
    defaultDueDate: 17 
};

const variant1 = {
    defaultStart: 15, // UTC
    defaultBillingDate: 15,
    defaultDueDate: 2 
};

export class Transaction {
    date: Date;
    type: 'advance' | 'purchase' | 'payment' | 'other';
    description: string;
    installments: number;
    interestRate: number;
    amount: number;
    interestsToBePaid: number = 0;

    constructor(
        date: Date | string,
        type: 'advance' | 'purchase' | 'payment' | 'other',
        description: string,
        installments: number,
        interestRate: number,
        amount: number
    ) {
        this.date = date instanceof Date ? date : new Date(date);
        this.type = type;
        this.description = description;
        this.installments = installments;
        this.interestRate = interestRate;
        this.amount = amount;
        this.interestsToBePaid = this.getInterestsToBePaid()
    }

    private getInterestsToBePaid() {
        
        let interestsToBePaid = 0;
        let debt = this.amount;
        let daysInCycle: number;
        let cycleDaysInDebt: number;
        let monthInterests: number;
        let cycle = getCurrentCycleDescriptor(this, 0);
        
        for (let i = 1; i <= this.installments; i++) {
            let { start, billingDate } = cycle;
            daysInCycle = dayjs(billingDate).diff(start, "days"); // Have to figure out how this 
            // actually works. Sometimes is 30, sometimes is 31.
            if (i === 1) {
                cycleDaysInDebt = dayjs(billingDate).diff(this.date, "days") + 1;
            } else {
                cycleDaysInDebt = dayjs(billingDate).diff(start, "days") + 1;
            }
            // console.log("days in cycle: ", daysInCycle);
            // console.log("days in debt: ", cycleDaysInDebt);

            monthInterests = debt * this.interestRate / 100 * cycleDaysInDebt / daysInCycle;
            interestsToBePaid += monthInterests;
            debt -= this.amount / this.installments;
            cycle = getNextCycleDescriptor(cycle, 0);
        }

        
        if (debt === 0) {
            console.log("debt is 0");
            return interestsToBePaid;
        } else {
            console.log("debt is not 0");
            console.log("debt: ", debt);
            return interestsToBePaid;
        }
    }
}

export interface TransactionJSON extends TransactionInterface {
    date: string
};

export function createTransaction({
    date,
    type,
    description,
    installments,
    interestRate,
    amount
}: Omit<TransactionJSON, "interestsToBePaid"> ): TransactionJSON {

    let transaction = new Transaction(date, type, description, installments, interestRate, amount);
    return {
        ...transaction,
        interestRate: Number(transaction.interestRate),
        date: transaction.date instanceof Date?
        transaction.date.toISOString() :
        new Date(transaction.date).toISOString()
    };
}

export function decomposeTransactionAndAddBalancesToOutlook(
    transaction: Transaction,
    cycleMap: Map<CycleDescriptor, CycleInterface>, 
    outlook: OutlookInterface
): void {
    let cycleDescriptor: CycleDescriptor = getCurrentCycleDescriptor(transaction, 0);
    let cycleDaysInDebt: number;

	let paidCapital = 0;
	let paidInterests = 0;
	let remainingCapital = transaction.amount;
	let remainingInterests;

	for (let installment = 1; installment <= transaction.installments; installment++) {

		const { start, billingDate } = cycleDescriptor;
		const daysInCycle = dayjs(billingDate).diff(start, "days");

		if (installment === 1) {
			cycleDaysInDebt = dayjs(billingDate).diff(transaction.date, "days") + 1;
		} else {
			cycleDaysInDebt = dayjs(billingDate).diff(start, "days") + 1;
		}

        const addressableAmount = transaction.amount / transaction.installments;
		const cycleInterests = remainingCapital * transaction.interestRate / 100 * cycleDaysInDebt / daysInCycle;

		paidCapital += addressableAmount;
		paidInterests += cycleInterests;
		remainingCapital = transaction.amount - paidCapital;
		remainingInterests = transaction.interestsToBePaid - paidInterests;

		const transactionBalance: TransactionBalanceInterface = {
			transactionDate: new Date(transaction.date),
			installments: { "n": installment, "of": transaction.installments},
			paidCapital,
			paidInterests,
			remainingCapital,
			remainingInterests
		}

		if (isCycleDescriptorInMap(cycleDescriptor, cycleMap)) {
            const equivalentCycleDescriptor = getEquivalentOrSameCycleDescriptorForMap(cycleDescriptor, cycleMap);
            const cycleInMap = cycleMap.get(equivalentCycleDescriptor);
            
            if ( cycleInMap ) {
                cycleInMap.transactionBalances.push(transactionBalance);
                cycleInMap.subtotalBar.paidCapital += paidCapital;
                cycleInMap.subtotalBar.paidInterests += paidInterests;
                cycleInMap.subtotalBar.remainingCapital += remainingCapital;
                cycleInMap.subtotalBar.remainingInterests += remainingInterests;

                // Also need to modify the cycle bill

                // cycleInMap.cycleBill.interestsFromPrevDebt
                cycleInMap.cycleBill.cycleInterests += cycleInterests;
                cycleInMap.cycleBill.addressableAmount += addressableAmount;
                cycleInMap.cycleBill.minimumPayment += addressableAmount + cycleInterests;
                cycleInMap.cycleBill.deferredAmount += remainingCapital;
                cycleInMap.cycleBill.fullPayment += addressableAmount + remainingCapital + cycleInterests;

                // Modify total bar

                
            }

		} else {
			cycleMap.set(cycleDescriptor, {
                cycle: 1,
                cycleStart: cycleDescriptor.start,
                cycleEnd: cycleDescriptor.billingDate,
                interestRate: transaction.interestRate,
                transactionBalances: [transactionBalance],
                subtotalBar: {
                    paidCapital,
                    paidInterests,
                    remainingCapital,
                    remainingInterests
                },
                cycleBill: {
                    dueDate: cycleDescriptor.dueDate,
                    interestsFromPrevDebt: NaN, 
                    cycleInterests,
                    addressableAmount,
                    minimumPayment: addressableAmount + cycleInterests,
                    deferredAmount: remainingCapital,
                    fullPayment: addressableAmount + remainingCapital + cycleInterests
                }
            });
		}

        // Modify total bar
        outlook.totalBar.paidCapital += addressableAmount;
        outlook.totalBar.paidInterests += cycleInterests;

		cycleDescriptor = getNextCycleDescriptor(cycleDescriptor, 0)
	}
    outlook.cycles = Array.from(cycleMap.values());
}

function isCycleDescriptorInMap(cycleDescriptor: CycleDescriptor, map: Map<CycleDescriptor, CycleInterface>): boolean {
    const candidateStart = new Date(cycleDescriptor.start);
    let answear = false;
    for (const key of map.keys()) {
        const existingStart = new Date(key.start);
        if (candidateStart.setUTCHours(0, 0, 0, 0) === existingStart.setUTCHours(0, 0, 0, 0)) {
            answear = true;
        }
    }
    return answear;
}

function getEquivalentOrSameCycleDescriptorForMap(
    cycleDescriptor: CycleDescriptor, map: Map<CycleDescriptor, 
    CycleInterface>
): CycleDescriptor {
    const sampleStart = new Date(cycleDescriptor.start);
    for (const key of map.keys()) {
        const existingStart = new Date(key.start);
        if (sampleStart.setUTCHours(0, 0, 0, 0) === existingStart.setUTCHours(0, 0, 0, 0)) {
            return key;
        }
    }
    return cycleDescriptor
}

function getDefaultOrLastOneMonthLater(current: Date, UTCDate: number) {
    let currentCopy = new Date(current);
    let defaultOrLastOneMonthLater: Date;
    let currentMonthStart = new Date(currentCopy.setUTCDate(1));
    let nextMonthStart = dayjs(currentMonthStart.setUTCMonth(currentMonthStart.getUTCMonth() + 1));

    if (UTCDate <= nextMonthStart.utc().endOf('month').date()) {
        defaultOrLastOneMonthLater = nextMonthStart.utc().date(UTCDate).toDate();
    } else {
        UTCDate = nextMonthStart.utc().endOf('month').date();
        defaultOrLastOneMonthLater = nextMonthStart.utc().date(UTCDate).toDate();
    }

    return defaultOrLastOneMonthLater;
}

function getDefaultOrLast(current: Date, UTCDate: number) {
    let currentCopy = new Date(current);
    let defaultOrLast: dayjs.Dayjs;
    // To get a dayjs object with the next month, the billingDate is transformed.
    currentCopy.setUTCDate(1); // to ensure that n days in month won't get exceeded.
    let currentMonth = dayjs(currentCopy);

    if (UTCDate <= currentMonth.utc().endOf('month').date()) {
        defaultOrLast = currentMonth.utc().date(UTCDate);
    } else {
        UTCDate = currentMonth.utc().endOf('month').date();
        defaultOrLast = currentMonth.utc().date(UTCDate);
    }

    return defaultOrLast.toDate();
}

function getCurrentCycleDescriptor(transaction: Transaction, variant: 0 | 1): CycleDescriptor {
    let { defaultStart, defaultBillingDate, defaultDueDate } = variant === 0 ? variant0 : variant1;
    let purchaseDate = transaction.date;

    //------------------------------------- start --------------------------------------------
    let start = transaction.date;
    let currentMonthStartDate = getDefaultOrLast(start, defaultStart);
    if (purchaseDate.getUTCDate() <= defaultBillingDate) {
        start = new Date(currentMonthStartDate.setUTCMonth(currentMonthStartDate.getUTCMonth() - 1));
    } else {
        start = new Date(currentMonthStartDate);
    }

    // ----------------------------------- billingDate ---------------------------------------
    let billingDate = getDefaultOrLastOneMonthLater(start, defaultBillingDate);

    //------------------------------------- dueDate ------------------------------------------
    // In case variant0's dueDate is in a different month than billingDate
    let dueDate = getDefaultOrLastOneMonthLater(billingDate, defaultDueDate);
    // In case variant1's dueDate is in the same month of the billingDate
    // dueDate = getDefaultOrLast(billingDate, defaultDueDate);

    return {
        start,
        billingDate,
        dueDate
    }
}

function getNextCycleDescriptor(currentCycle: CycleDescriptor, variant: 0 | 1): CycleDescriptor {
    let { defaultStart, defaultBillingDate, defaultDueDate } = variant === 0 ? variant0 : variant1;
    let { start, billingDate, dueDate } = currentCycle;
        start = getDefaultOrLastOneMonthLater(start, defaultStart);
        billingDate = getDefaultOrLastOneMonthLater(billingDate, defaultBillingDate);
        dueDate = getDefaultOrLastOneMonthLater(dueDate, defaultDueDate);
        
        return {
            start,
            billingDate,
            dueDate
        }
}

export function enumerateCyclesInOutlook(outlook: OutlookInterface): void {
    const { cycles } = outlook;
    cycles.sort((a, b) => {
        return new Date(a.cycleStart).getTime() - new Date(b.cycleStart).getTime();
    })
    for (let i = 0; i <cycles.length; i++) {
        cycles[i].cycle = i+1;
    }
}