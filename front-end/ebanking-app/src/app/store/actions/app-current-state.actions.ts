import { Account } from '@app/core/accounts/account';
import { Action } from '@ngrx/store';

export enum AppCurrentStateActionTypes {
    AppCurrentStateAccountSelectedAction = '[Current Selected Account] Select Account'
}

export class AppCurrentStateAccountSelectedAction implements Action {
    readonly type = AppCurrentStateActionTypes.AppCurrentStateAccountSelectedAction;
    constructor(public payload: Account){}
}

export type AppCurrentStateActions = AppCurrentStateAccountSelectedAction;