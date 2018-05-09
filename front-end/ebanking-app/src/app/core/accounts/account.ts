export class Account {
    constructor(public id: string,
                public userId: string,
                public accountName: string,
                public accountNumber: string,
                public accountType: string, // TODO change to enum
                public balance: number,
                public availableBalance: number,
                public interestRate: number,
                public bin?: string,
                public bsbCode?: string,
                public accountNickName?: string) {
    }

    displayName(): string {
        return `${this.accountName} - ${this.accountType}`;
    }
}
