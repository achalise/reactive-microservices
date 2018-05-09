import { Account } from '@app/core/accounts/account';
import { SelectAccount } from '@app/dashboard/store';
import { DashboardActions, DashboardActionTypes, RequestAccountsComplete } from '../actions/dashboard.actions';


export interface DashBoardState {
    accounts: Account[];
    accountLoading: boolean;
    selectedAccount: Account;
}

export function dashboardReducer(state: DashBoardState, action: DashboardActions): DashBoardState {
    switch (action.type) {
        case DashboardActionTypes.RequestAccounts:
            return { ...state, accountLoading: true };
        case DashboardActionTypes.RequestAccountsComplete:
            const reqComAction = action as RequestAccountsComplete;
            return { ...state, accounts: reqComAction.payload, accountLoading: false };
        case DashboardActionTypes.SelectAccount:
            let selectAccountAction = action as SelectAccount;
            return { ...state, selectedAccount: selectAccountAction.payload }
        default:
            return state;
    }
}
