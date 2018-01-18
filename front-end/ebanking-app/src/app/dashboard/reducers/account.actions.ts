import {Account} from "../../core/accounts/account";
import {Action} from "@ngrx/store";
import {Payee} from "../../core/accounts/payee";

export enum AccountActionTypes {
    RequestPayees = '[Payees] Load',
    RequestPayeesComplete = '[Payees] Load Complete',
    RequestAccounts = '[Account] Load',
    RequestAccountsComplete = '[Account] Load Complete'
}

export class RequestAccounts implements Action {
    readonly type = AccountActionTypes.RequestAccounts;
    constructor(){};
}

export class RequestAccountsComplete implements Action {
    readonly type = AccountActionTypes.RequestAccountsComplete;
    constructor(public payload: Account[]) {}
}

export class RequestPayees implements Action {
    readonly type = AccountActionTypes.RequestPayees;
    constructor(){}
}

export class RequestPayeesComplete implements Action {
    readonly type = AccountActionTypes.RequestPayeesComplete;
    constructor(public payload: Payee[]){}
}
export type AccountActions = RequestAccounts | RequestAccountsComplete;