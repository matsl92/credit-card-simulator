export interface CreditCardInterface {
    name: string,
    franchise: "visa" | "amex" | "mastercard",
    variant: 0 | 1,
    interestRate: number
}