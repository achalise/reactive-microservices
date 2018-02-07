export interface IPaymentResponse {
    status: string,
    errorCode: string,
    transactionId: string,
    transactionDateTime: Date
}