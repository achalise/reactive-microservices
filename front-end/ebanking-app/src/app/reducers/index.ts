import {Account} from "../core/accounts/account";
import {Payee} from "../core/accounts/payee";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface State {
    counter: number,
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

//TODO move this to core with a separate directory for payment related code. Perhaps move actions and reducers also to
//core .. ?
export enum PaymentStatus {
    NEW = 'NEW',
    CONFIRMED = 'CONFIRMED',
    SUBMITTED = 'SUBMITTED',
    SUCCESS = 'SUCCESS'
}