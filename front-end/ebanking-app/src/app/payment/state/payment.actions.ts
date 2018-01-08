import {Action} from "@ngrx/store";
import {Account} from "../../core/accounts/account";
import {Payee} from "../../core/accounts/payee";

export enum PaymentActionTypes {
    InitPaymentRequest = '[Payment Request] Init',
    UpdateFromAccount = '[Payment Request - From Account] Update',
    UpdateToAccount = '[Payment Request - To Account] Update'
}

export class InitPaymentRequest implements Action {
    readonly type = PaymentActionTypes.InitPaymentRequest;
    constructor() {}
}

export class UpdateFromAccount implements Action {
    readonly type = PaymentActionTypes.UpdateFromAccount;
    constructor(public payload: Account) {}
}

export class UpdateToAccount implements Action {
    readonly type = PaymentActionTypes.UpdateToAccount;
    constructor(public payload: Payee){};
}

export type PaymentActions = InitPaymentRequest | UpdateFromAccount | UpdateToAccount;