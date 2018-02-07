import { PaymentState } from '@app/payment/store/';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getPaymentState = createFeatureSelector<PaymentState>('payment');
export const getPayeesState = createSelector(getPaymentState, state => state.payees);
export const getPayees = createSelector(getPayeesState, payeesState => payeesState.payees);
export const getPaymentRequest = createSelector(getPaymentState, state => state.paymentRequest);
