import {Action} from "@ngrx/store";
import {Payee} from "../../core/accounts/payee";

export enum PayeeActionTypes {
    RequestPayees = '[Payees] Load',
    RequestPayeesComplete = '[Payees] Load Complete'
}

export class RequestPayees implements Action {
    readonly type = PayeeActionTypes.RequestPayees;
    constructor(){}
}

export class RequestPayeesComplete implements Action {
    readonly type = PayeeActionTypes.RequestPayeesComplete;
    constructor(public payload: Payee[]){}
}
export type PayeeActions = RequestPayees | RequestPayeesComplete;