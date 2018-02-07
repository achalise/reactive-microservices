export class Payee {
    constructor(public accountName: string,
                public accountNumber: string,
                public payeeType: string, // TODO change to enum
                public bsbCode?: string,
                public billerCode?: string,
                public payeeNickName?: string) {
    }

    displayName() {
        return `${this.accountName} - ${this.accountNumber}`;
    }
}

// TODO 1. implement receive payees and populate to account, 2. add amount and notes, 3. Add confirmation page
