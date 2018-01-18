import {Account} from "../accounts/account";
import {Payee} from "../accounts/payee";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {AuthStatus} from "../models/login.info";

export interface State {
    counter: number,
    authState: IAuthenticationState,
    accounts: AccountsState,
    payees: PayeesState,
    paymentRequest: PaymentRequest
}

export interface AccountsState {
    accounts: Account[],
    accountLoading: boolean
}

export interface PayeesState {
    payees: Payee[],
    payeesLoading: boolean
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