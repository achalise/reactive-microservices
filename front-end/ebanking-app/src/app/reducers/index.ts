import {Account} from "../core/accounts/account";
import {Payee} from "../core/accounts/payee";

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
    paymentDate: Date
}