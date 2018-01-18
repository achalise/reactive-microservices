import {Action} from "@ngrx/store";
import {AccountActionTypes, RequestPayeesComplete} from "./account.actions";
import {PayeesState} from "../../core/reducers";

export function payeesReducer(state: PayeesState, action: Action ) {
    switch (action.type) {
        case AccountActionTypes.RequestPayees:
            return {...state, payeesLoading: true};
        case AccountActionTypes.RequestPayeesComplete:
            let reqAction = action as RequestPayeesComplete;
            return {...state, payees: reqAction.payload, payeesLoading: false};
        default:
            return state;
    }
}