export class Transaction {
    constructor(public transactionId: string,
                public accountNumber: string,
                public toAccount: string,
                public amount: number,
                public description: string,
                public transactionType: string,
                public balance: number){}
}
