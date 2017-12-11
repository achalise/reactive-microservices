export class Account {
    constructor( private id: string,
                 public accountName: string,
                 public accountNumber: string,
                 public accountType: string,
                 public balanceAvailable: number,
                 public accountNickName?: string
    ){}

    displayName(): string {
        return `${this.accountName} - ${this.accountType}`;
    }
}
