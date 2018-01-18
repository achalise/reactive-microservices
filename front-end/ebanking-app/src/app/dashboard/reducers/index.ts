import { Account } from "../../core/accounts/account";
import * as fromRoot from "../../reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AccountsState {
    accounts: Account[],
    accountLoading: boolean
}

export interface State extends fromRoot.State {
    accountsState: AccountsState
}

export const getAccountsState = createFeatureSelector<AccountsState>('accounts');
export const getAccounts = createSelector(getAccountsState, state => state.accounts);