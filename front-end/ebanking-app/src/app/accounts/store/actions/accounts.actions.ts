import { Account } from '@app/core/accounts/account';
import { Transaction } from '@app/core/accounts/transaction';
import { Action } from '@ngrx/store';

export enum AccountsActionTypes {
    LoadAccountTransactionsAction = '[Account] Load Transactions',
    AccountTransactionsLoadedAction = '[Account] Transactions loaded'
}


export class LoadAccountTransactionsAction implements Action {
    readonly type = AccountsActionTypes.LoadAccountTransactionsAction;
    constructor(public account: Account) {}
}

export class AccountTransactionsLoadedAction implements Action {
    readonly type = AccountsActionTypes.AccountTransactionsLoadedAction;
    constructor(public payload: AccountTransactionsLoadedActionPayload) {}
}

export type AccountsActions = LoadAccountTransactionsAction | AccountTransactionsLoadedAction;

export interface AccountTransactionsLoadedActionPayload {
    accountId: string;
    transactions: Transaction[]
}