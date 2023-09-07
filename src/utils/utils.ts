import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { TransactionInterface } from "@components/basic/Transaction";
dayjs.extend(utc);

export class Transaction {
    date: Date | string;
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

        let variant0 = {
            defaultStart: 30, // UTC
            defaultBillingDate: 30,
            defaultDueDate: 17 
        };

        let variant1 = {
            defaultStart: 15, // UTC
            defaultBillingDate: 15,
            defaultDueDate: 2 
        };

        interface Cycle {
            start: Date,
            billingDate: Date,
            dueDate: Date
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
        
        function getCurrentCycle(transaction: Transaction, variant: 0 | 1): Cycle {
            let { defaultStart, defaultBillingDate, defaultDueDate } = variant === 0 ? variant0 : variant1;
            let purchaseDate = transaction.date instanceof Date ? 
            transaction.date : 
            new Date(transaction.date);
        
            //------------------------------------- start --------------------------------------------
            let start;
            let currentMonthStartDate = getDefaultOrLast(purchaseDate, defaultStart);
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
        
        function getNextCycle(currentCycle: Cycle, variant: 0 | 1): Cycle {
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
        
        let interestsToBePaid = 0;
        let debt = this.amount;
        let daysInCycle: number;
        let cycleDaysInDebt: number;
        let monthInterests: number;
        let cycle = getCurrentCycle(this, 0);
        
        for (let i = 1; i <= this.installments; i++) {
            let { start, billingDate } = cycle;
            daysInCycle = dayjs(billingDate).diff(start, "days"); // Have to figure out how this 
            // actually works. Sometimes is 30, sometimes is 31.
            if (i === 1) {
                cycleDaysInDebt = dayjs(billingDate).diff(this.date, "days") + 1;
            } else {
                cycleDaysInDebt = dayjs(billingDate).diff(start, "days") + 1;
            }
            console.log("days in cycle: ", daysInCycle);
            console.log("days in debt: ", cycleDaysInDebt);

            monthInterests = debt * this.interestRate / 100 * cycleDaysInDebt / daysInCycle;
            interestsToBePaid += monthInterests;
            debt -= this.amount / this.installments;
            cycle = getNextCycle(cycle, 0);
        }

        console.log("debt: ", debt);

        if (debt === 0) {
            return interestsToBePaid;
        } else {
            console.log("debt is not 0");
            return interestsToBePaid;
        }
    }
}

interface TransactionJSON extends TransactionInterface {
    date: string
};

export function createTransaction({
    date,
    type,
    description,
    installments,
    interestRate,
    amount
}: Omit<Transaction, "interestsToBePaid"> ): TransactionJSON {

    let transaction = new Transaction(date, type, description, installments, interestRate, amount);
    return {
        ...transaction,
        date: transaction.date instanceof Date?
        transaction.date.toISOString() :
        new Date(transaction.date).toISOString()
    };
}