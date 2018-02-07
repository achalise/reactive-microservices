import { PayeesState } from './index';
import { PayeeActions, PayeeActionTypes, RequestPayeesComplete } from '../actions/payee.actions';

export function payeesReducer(state: PayeesState, action: PayeeActions) {
    switch (action.type) {
        case PayeeActionTypes.RequestPayees:
            return { ...state, payeesLoading: true };
        case PayeeActionTypes.RequestPayeesComplete:
            const reqAction = action as RequestPayeesComplete;
            return { ...state, payees: reqAction.payload, payeesLoading: false };
        default:
            return state;
    }
}
