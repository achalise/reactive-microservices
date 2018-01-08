import {Action} from "@ngrx/store";
import {AccountActions, AccountActionTypes, RequestAccountsComplete, RequestPayeesComplete} from "./account.actions";

export function accountsReducer(state: Account[] = [], action: Action ) {
    switch (action.type) {
        case AccountActionTypes.RequestAccounts:
            return {...state, accountLoading: true};
        case AccountActionTypes.RequestAccountsComplete:
            let reqComAction = action as RequestAccountsComplete;
            return {...state, accounts: reqComAction.payload, accountLoading:false};
        case AccountActionTypes.RequestPayees:
            return {...state, payeesLoading: true};
        case AccountActionTypes.RequestPayeesComplete:
            let reqAction = action as RequestPayeesComplete;
            return {...state, payees: reqAction.payload, payeesLoading: false};
        default:
            return state;
    }
}