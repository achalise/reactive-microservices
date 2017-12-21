import {Action} from "@ngrx/store";
import {AccountActions, AccountActionTypes, RequestAccountsComplete} from "./account.actions";

export function accountsReducer(state: Account[] = [], action: Action ) {
    switch (action.type) {
        case AccountActionTypes.RequestAccounts:
            return {...state, accountLoading: true}
        case AccountActionTypes.RequestAccountsComplete:
            let reqComAction = action as RequestAccountsComplete;
            return {...state, accounts: reqComAction.payload, accountLoading:false}
        default:
            return state;
    }

}