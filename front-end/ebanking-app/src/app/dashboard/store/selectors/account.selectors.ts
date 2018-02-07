import { AccountsState } from '@app/dashboard/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAccountsState = createFeatureSelector<AccountsState>('accounts');
export const getAccounts = createSelector(getAccountsState, state => state.accounts);
