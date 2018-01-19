import { Payee } from "../../core/accounts/payee";
import * as fromRoot from "../../reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { payeesReducer } from "./payees.reducer";

export interface PayeesState {
    payees: Payee[],
    payeesLoading: boolean
}

export interface State extends fromRoot.State {
    payees: PayeesState
}

export const reducers = {
    payees: payeesReducer
};
export const getPayeesState = createFeatureSelector<PayeesState>('payment');
export const getPayees = createSelector(getPayeesState, state => state.payees);