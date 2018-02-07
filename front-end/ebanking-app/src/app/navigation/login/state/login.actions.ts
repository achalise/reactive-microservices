import { ConfigData } from '@app/store/reducers/index';
import { Action } from '@ngrx/store';
import * as fromLogin from '@app/core/models';

export enum LoginActionTypes {
    LoginRequest = '[Login] - submit login request',
    LoginSuccess = '[Login] - success',
    LoginError = '[Login] - error',
    LoginSuccessNavigate = '[Login]  - Sucess and navigate'
}

export class LoginRequest implements Action {
    readonly type = LoginActionTypes.LoginRequest;

    constructor(public payload: fromLogin.LoginInfo) {
    }
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;

    constructor(public payload: fromLogin.ILoginResponse) {
    }
}

export class LoginError implements Action {
    readonly type = LoginActionTypes.LoginError;

    constructor(public payload: fromLogin.ILoginResponse) {
    }
}

export class LoginSuccessNavigate implements Action {
    readonly type = LoginActionTypes.LoginSuccessNavigate;
}

export type LoginActions = LoginRequest | LoginSuccess | LoginError;
