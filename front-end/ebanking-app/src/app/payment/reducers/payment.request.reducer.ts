import {
    PaymentActions,
    PaymentActionTypes, SubmitPaymentSuccess, UpdateFromAccount, UpdatePaymentAmount, UpdatePaymentDate,
    UpdatePaymentNotes,
    UpdatePaymentStatus,
    UpdateToAccount
} from "./payment.actions";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { PaymentRequest, PaymentStatus } from "./index";

export function paymentRequestReducer(state: PaymentRequest, action: PaymentActions) {
    switch (action.type) {
        case PaymentActionTypes.InitPaymentRequest:
            //TODO: create an initial state object separately
            const now = new Date();
            return {...state,
                    fromAccount: null,
                    toAccount: null,
                    amount: null,
                    paymentDate: {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()} as NgbDateStruct,
                    notes: '',
                    status: PaymentStatus.NEW
            };
        case PaymentActionTypes.UpdateFromAccount:
            let updateAccountAction = action as UpdateFromAccount;
            return {...state, fromAccount: updateAccountAction.payload};
        case PaymentActionTypes.UpdateToAccount:
            let updatePayeeAction = action as UpdateToAccount;
            return {...state, toAccount: updatePayeeAction.payload};
        case PaymentActionTypes.UpdatePaymentDate:
            let updateDateAction = action as UpdatePaymentDate;
            return {...state, paymentDate: updateDateAction.payload};
        case PaymentActionTypes.UpdatePaymentAmount:
            let paymentAmtUpdate = action as UpdatePaymentAmount;
            return {...state, amount: paymentAmtUpdate.payload};
        case PaymentActionTypes.UpdatePaymentNotes:
            let notesUpdateAction = action as UpdatePaymentNotes;
            return {...state, notes: notesUpdateAction.payload};
        case PaymentActionTypes.UpdatePaymentStatus:
            let paymentStatusAction = action as UpdatePaymentStatus;
            return {...state, status: paymentStatusAction.payload};
        case PaymentActionTypes.SubmitPaymentRequest:
            return {...state, status: PaymentStatus.SUBMITTED};
        case PaymentActionTypes.SubmitPaymentRequestSuccess:
            let paymentSuccessAction = action as SubmitPaymentSuccess;
            return {...state, status: PaymentStatus.SUCCESS,
                transactionId: paymentSuccessAction.payload.transactionId,
                transactionDateTime: paymentSuccessAction.payload.transactionDateTime
            };
        default:
            return state;
    }
}
