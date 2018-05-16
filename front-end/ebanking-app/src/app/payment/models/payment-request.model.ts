export class PaymentRequestModel {
    constructor(public fromAccountId: string,
                public paymentDate: Date,
                public fromAccountType: string,
                public fromAccountNumber: string,
                public amount: number,
                public description: string,
                public toAccountId?: string,
                public billerCode?: string,
                public billerReference?: string,
                public toAccountBsb?: string,
                public toAccountNumber?: string,
                public toAccountName?: string,
                public paymentType?: string
                ) { }
}
