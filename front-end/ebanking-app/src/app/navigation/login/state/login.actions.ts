import { Action } from '@ngrx/store';
import * as fromLogin from '@app/core/models';

export enum LoginActionTypes {
    LoginRequest = '[Login] - submit login request',
    LoginSuccess = '[Login] - success',
    LoginError = '[Login] - error',
    Login2FA = '[Login] - 2FA prompt',
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

export class Login2FA implements Action {
    readonly type = LoginActionTypes.Login2FA;

    constructor(public payload: fromLogin.ILoginResponse) {}
}

export type LoginActions = LoginRequest | LoginSuccess | LoginError | Login2FA;
