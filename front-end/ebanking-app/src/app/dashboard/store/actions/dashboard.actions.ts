import { Account } from 'app/core/accounts/account';
import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
    RequestAccounts = '[Dashboard Accounts] Load',
    RequestAccountsComplete = '[Dashboard Accounts] Load Complete',
    SelectAccount = '[Dashboard Accounts] Select Account'
}

export class RequestAccounts implements Action {
    readonly type = DashboardActionTypes.RequestAccounts;

    constructor() {
    }
}

export class RequestAccountsComplete implements Action {
    readonly type = DashboardActionTypes.RequestAccountsComplete;

    constructor(public payload: Account[]) {
    }
}

export class SelectAccount implements Action {
    readonly type = DashboardActionTypes.SelectAccount;
    constructor(public payload: Account){}
}

export type DashboardActions = RequestAccounts | RequestAccountsComplete| SelectAccount;
