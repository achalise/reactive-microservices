import { Payee } from "../../core/accounts/payee";
import * as fromRoot from "../../reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { payeesReducer } from "./payees.reducer";
import { Account } from "../../core/accounts/account";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface PaymentRequest {
    fromAccount: Account,
    toAccount: Payee,
    amount: number,
    paymentDate: NgbDateStruct,
    notes: string,
    status: PaymentStatus
}

export interface PayeesState {
    payees: Payee[],
    payeesLoading: boolean
}

export interface State extends fromRoot.State {
    payees: PayeesState
    paymentRequest: PaymentRequest
}

export const reducers = {
    payees: payeesReducer
};

export enum PaymentStatus {
    NEW = 'NEW',
    CONFIRMED = 'CONFIRMED',
    SUBMITTED = 'SUBMITTED',
    SUCCESS = 'SUCCESS'
}

export const getPaymentState = createFeatureSelector<State>('payment');
export const getPayeesState = createSelector(getPaymentState, state => state.payees);
export const getPayees = createSelector(getPayeesState, payeesState => payeesState.payees);
export const getPaymentRequest = createSelector(getPaymentState, state => state.paymentRequest);
