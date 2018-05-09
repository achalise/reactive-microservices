import { AccountsState } from '@app/accounts/store/reducers/accounts.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAccountsState = createFeatureSelector<AccountsState>('accountsState');
export const getTransactionsForAccount = accountId => createSelector(getAccountsState,
        accountsState => accountsState.transactions[accountId]);

