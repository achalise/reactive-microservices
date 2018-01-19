import {Action} from "@ngrx/store";
import {Account} from "../../core/accounts/account";
import {Payee} from "../../core/accounts/payee";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {IPaymentResponse} from "../../core/payment/payment.response";
import { PaymentStatus } from "./index";

export enum PaymentActionTypes {
    InitPaymentRequest = '[Payment Request] Init',
    UpdateFromAccount = '[Payment Request - From Account] Update',
    UpdateToAccount = '[Payment Request - To Account] Update',
    UpdatePaymentDate = '[Payment Request -  Payment date] Update',
    UpdatePaymentAmount = '[Payment Request - Payment amount] Update',
    UpdatePaymentNotes = '[Payment Request - Payment notes] Update',
    UpdatePaymentStatus = '[Payment Request - Payment status] Update',
    SubmitPaymentRequest = '[Payment Request] - Submit payment',
    SubmitPaymentRequestSuccess = '[Payment Request] - Submission successful',
    SubmitPaymentRequestSuccessNavigate = '[Payment Request] - Navigate after submission'
}

export class InitPaymentRequest implements Action {
    readonly type = PaymentActionTypes.InitPaymentRequest;
    constructor() {}
}

export class SubmitPaymentRequest implements Action {
    readonly type = PaymentActionTypes.SubmitPaymentRequest;
    constructor(){}
}

export class SubmitPaymentSuccess implements Action {
    readonly type = PaymentActionTypes.SubmitPaymentRequestSuccess;
    constructor(public payload: IPaymentResponse){}
}

export class SubmitPaymentSuccessNavigate implements Action {
    readonly type = PaymentActionTypes.SubmitPaymentRequestSuccessNavigate;
}

export class UpdateFromAccount implements Action {
    readonly type = PaymentActionTypes.UpdateFromAccount;
    constructor(public payload: Account) {}
}

export class UpdateToAccount implements Action {
    readonly type = PaymentActionTypes.UpdateToAccount;
    constructor(public payload: Payee){};
}

export class UpdatePaymentDate implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentDate;
    constructor(public payload: NgbDateStruct){};
}

export class UpdatePaymentAmount implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentAmount;
    constructor(public payload: number){}
}

export class UpdatePaymentNotes implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentNotes;
    constructor(public payload: string){}
}

export class UpdatePaymentStatus implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentStatus;
    constructor(public payload: PaymentStatus){}
}

export type PaymentActions = InitPaymentRequest |
                             UpdateFromAccount |
                             UpdateToAccount |
                             UpdatePaymentDate |
                             UpdatePaymentAmount |
                             SubmitPaymentRequest|
                             SubmitPaymentSuccess|
                             UpdatePaymentNotes |
                             UpdatePaymentStatus;