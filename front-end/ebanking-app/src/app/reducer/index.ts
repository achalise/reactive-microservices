import {Account} from "../core/accounts/account";
import {Payee} from "../core/accounts/payee";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {AuthStatus} from "../core/models/login.info";

export interface State {
    counter: number,
    authState: IAuthenticationState,
    // payees: PayeesState,
    paymentRequest: PaymentRequest
}



export interface PaymentRequest {
    fromAccount: Account,
    toAccount: Payee,
    amount: number,
    paymentDate: NgbDateStruct,
    notes: string,
    status: PaymentStatus
}

export interface IAuthenticationState {
    status: AuthStatus,
    errorCode: string,
    message: string
}

//TODO move this to core with a separate directory for payment related code. Perhaps move actions and reducers also to
//core .. ?
export enum PaymentStatus {
    NEW = 'NEW',
    CONFIRMED = 'CONFIRMED',
    SUBMITTED = 'SUBMITTED',
    SUCCESS = 'SUCCESS'
}