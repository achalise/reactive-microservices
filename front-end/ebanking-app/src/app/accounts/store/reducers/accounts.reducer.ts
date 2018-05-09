import {
    AccountsActions,
    AccountsActionTypes, AccountTransactionsLoadedAction
} from '@app/accounts/store/actions/accounts.actions';
import { Transaction } from '@app/core/accounts/transaction';

export interface AccountsState {
    selectedAccount: string;
    transactions: TransactionsMap
}

interface TransactionsMap {
    [accountId: string]: Transaction[]
}

export function accountsReducer(state: AccountsState = {selectedAccount: null, transactions: {}}, action: AccountsActions): AccountsState {
    switch (action.type) {
        case AccountsActionTypes.LoadAccountTransactionsAction: // TODO add state to indicate request started
            return state;
        case AccountsActionTypes.AccountTransactionsLoadedAction:
            const theAction: AccountTransactionsLoadedAction = action as AccountTransactionsLoadedAction;
            return { ...state, transactions: {[theAction.payload.accountId]: theAction.payload.transactions}};
        default:
            return state;
    }
}
