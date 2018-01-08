import {PaymentRequest} from "../../reducers";
import {Action} from "@ngrx/store";
import {PaymentActionTypes, UpdateFromAccount, UpdateToAccount} from "./payment.actions";

export function paymentRequestReducer(state: PaymentRequest, action: Action) {
    switch (action.type) {
        case PaymentActionTypes.InitPaymentRequest:
            return {...state, fromAccount: null, toAccount: null, amount: 20, paymentDate: new Date(2018, 1, 13)};
        case PaymentActionTypes.UpdateFromAccount:
            let updateAccountAction = action as UpdateFromAccount;
            return {...state, fromAccount: updateAccountAction.payload};
        case PaymentActionTypes.UpdateToAccount:
            let updatePayeeAction = action as UpdateToAccount;
            return {...state, toAccount: updatePayeeAction.payload};
        default:
            return state;
    }
}