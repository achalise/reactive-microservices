import { Account } from '@app/core/accounts/account';
import { AccountActions, AccountActionTypes, RequestAccountsComplete } from '../actions/account.actions';


export interface AccountsState {
    accounts: Account[];
    accountLoading: boolean;
}

export function accountsReducer(state: AccountsState, action: AccountActions): AccountsState {
    switch (action.type) {
        case AccountActionTypes.RequestAccounts:
            return { ...state, accountLoading: true };
        case AccountActionTypes.RequestAccountsComplete:
            const reqComAction = action as RequestAccountsComplete;
            return { ...state, accounts: reqComAction.payload, accountLoading: false };
        default:
            return state;
    }
}
