import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export class Transaction {
    date: Date;
    type: 'advance' | 'purchase' | 'payment' | 'other';
    description: string;
    installments: number;
    interestRate: number;
    amount: number;
    interestsToPay: number = 0;

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
        this.interestsToPay = this.getInterestsToPay()
    }

    private getInterestsToPay() {

        function getDefaultOrLast(current: Date, UTCDate: number) {
            let nextBillingDate: dayjs.Dayjs;
            // To get a dayjs object with the next month, the billingDate is transformed.
            current.setUTCDate(1); // to ensure that n days in month won't get exceeded.
            current.setUTCMonth(current.getUTCMonth() + 1);
            let nextMonth = dayjs(current);

            if (UTCDate <= nextMonth.utc().endOf('month').date()) {
                nextBillingDate = nextMonth.utc().date(UTCDate);
            } else {
                UTCDate = nextMonth.utc().endOf('month').date();
                nextBillingDate = nextMonth.utc().date(UTCDate);
            }

            return nextBillingDate.toDate();
        }

        interface Cycle {
            start: Date,
            billingDate: Date,
            dueDate: Date,
            // end: Date,
            variant: 0 | 1
        }

        type Staff = {
            name: string;
            salary: number;
            } 
        type staffKeys = keyof Staff; // "name" | "salary";

        let staff: staffKeys = "name"

        console.log(staff);

        function getNextCycle({
            dueDate, 
            start, 
            // end, 
            billingDate, 
            variant
        }: Cycle): Cycle {

            //------------------------------------- start --------------------------------------------
            // Same for both variants
            start.setUTCMonth(start.getUTCMonth() + 1);


            // ----------------------------------- billingDate ---------------------------------------
            let nextEnd: dayjs.Dayjs;
            if (variant === 1) {
                nextEnd = dayjs(billingDate.setUTCMonth(billingDate.getUTCMonth() + 1));
            } else {
                let billingDateUTCDate = billingDate.getUTCDate();
                // To get a dayjs object with the next month, the billingDate is transformed.
                billingDate.setUTCDate(1); // to ensure that n days in month won't get exceeded.
                billingDate.setUTCMonth(billingDate.getUTCMonth() + 1);
                let nextMonth = dayjs(billingDate);

                if (billingDateUTCDate <= nextMonth.utc().endOf('month').date()) {
                    nextEnd = nextMonth.utc().date(billingDateUTCDate);
                } else {
                    billingDateUTCDate = nextMonth.utc().endOf('month').date();
                    nextEnd = nextMonth.utc().date(billingDateUTCDate);
                }
            }

            //------------------------------------- dueDate ------------------------------------------
            // I guess due dates are either in the middle of the month or at the beginning in which 
            // case it's only necessary to increment the month. In case it is at the end of the month 
            // for variant 1, we would have to get the end of the month.
            dueDate.setUTCMonth(dueDate.getUTCMonth() + 1);
            

            billingDate.setUTCDate(billingDate.getUTCMonth() + 1);


            return {
                dueDate,
                start,
                // end: nextEnd.toDate(),
                billingDate: nextEnd.toDate(),
                variant
            };
        }

        let fisrstDueDate = new Date(this.date.setUTCDate(17));
        fisrstDueDate.setUTCMonth(fisrstDueDate.getUTCMonth() + 1);

        let cycle: Cycle = {
            start: new Date(this.date.setUTCDate(1)),
            billingDate: getDefaultOrLast(this.date, 31),
            dueDate: fisrstDueDate,
            variant: 0
        }

        let interestsToPay = 0;
        let debt = this.amount;
        let daysInMonth: number;
        let monthDaysInDebt: number;
        let monthInterests: number
        // let currentCycle = this.date.getUTCMonth(); // actually I need the number of days in the month
        for (let i = 1; i <= this.installments; i++) {
            let { start, billingDate } = cycle;
            daysInMonth = dayjs(billingDate).diff(start, "days");
            if (i === 1) {
                monthDaysInDebt = dayjs(this.date).diff(billingDate, "days");
            } else {
                monthDaysInDebt = dayjs(start).diff(billingDate, "days");
            }

            monthInterests = debt * this.interestRate * monthDaysInDebt / daysInMonth;
            interestsToPay += monthInterests;
            debt -= this.amount / this.installments;
            cycle = getNextCycle(cycle);
        }

        if (debt === 0) {
            return interestsToPay;
        } else {
            console.log("debt did not get fully paid");
            return interestsToPay;
        }
    }
}

let creamPurchase = new Transaction(
    new Date(), 
    "purchase", 
    "The thing I needed", 
    3, 
    3.1214, 
    350000
);

console.log(creamPurchase);