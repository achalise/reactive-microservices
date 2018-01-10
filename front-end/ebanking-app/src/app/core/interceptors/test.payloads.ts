export const accountListResponse =
    {
        "cashAccounts" :
            [{
                "id": "e31521d1-0c61-4263-a830-1d5c7c10bd0f",
                "userId": "user0",
                "accountNumber": "CASH_1254870",
                "bsbCode": "111234",
                "accountName": "Test User 0",
                "balance": 2000,
                "availableBalance": 0,
                "accountType": "CASH",
                "interestRate": 2.3
            }],
        "cardAccounts":
            [{
                "id": "c889ca24-c882-41c1-bd1a-052bf5303587",
                "userId": "jdoe",
                "bin": "412389",
                "accountNumber": "XXXXXXXXXXXX4237",
                "accountName": "Jo Doe",
                "balance": 2000,
                "availableBalance": 0,
                "accountType": "CARD",
                "interestRate": 9.5
            }, {
                "id": "fc8aa9f3-6e2d-43bb-ba76-e6e61d538798",
                "userId": "jdoe",
                "bin": "543189",
                "accountNumber": "XXXXXXXXXXXX1548",
                "accountName": "Jo Doe",
                "balance": 1200,
                "availableBalance": 0,
                "accountType": "CARD",
                "interestRate": 11.5
            }]
    };

export const payeeResponse = [
        {
            "id": "e31521d1-0c61-4263-a830-1d5c7c10bd0f",
            "userId": "user0",
            "accountNumber": "CASH_1254870",
            "bsbCode": "111234",
            "accountName": "Test User 0",
            "payeeType": "SELF"
        },
        {
            "id": "c889ca24-c882-41c1-bd1a-052bf5303587",
            "userId": "user0",
            "accountNumber": "XXXXXXXXXXXX4237",
            "accountName": "Joe Doe",
            "payeeType": "SELF"
        },
        {
            "id": "c889ca24-c882-41c1-bd1a-052bf5303587",
            "userId": "user0",
            "billerCode": "321346",
            "accountNumber": "1236767123",
            "accountName": "Sydney Water",
            "payeeType": "BILLER"
        }
];

export const paymentResponse = {
    status: 'SUCCESS',
    errorCode: null,
    transactionId: '123123RECEIPT',
    transactionDateTime: new Date()
}
