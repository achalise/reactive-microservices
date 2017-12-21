import {Account} from "../../core/accounts/account";
import {Action} from "@ngrx/store";

export enum AccountActionTypes {
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

export type AccountActions = RequestAccounts | RequestAccountsComplete;