export class Account {
    constructor( private id: string,
                 private userId: string,
                 public accountName: string,
                 public accountNumber: string,
                 public accountType: string, //TODO change to enum
                 public balance: number,
                 public availableBalance: number,
                 public interestRate: number,
                 public bin?: string,
                 public bsbCode?: string,
                 public accountNickName?: string
    ){}

    displayName(): string {
        return `${this.accountName} - ${this.accountType}`;
    }
}