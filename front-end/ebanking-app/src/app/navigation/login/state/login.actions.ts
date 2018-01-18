import {Action} from "@ngrx/store";
import { ILoginResponse, LoginInfo } from "../../../core/models/login.info";

export enum LoginActionTypes {
    LoginRequest = '[Login] - submit login request',
    LoginSuccess = '[Login] - success',
    LoginError = '[Login] - error',
    LoginSuccessNavigate = '[Login]  - Sucess and navigate'
}

export class LoginRequest implements Action {
    readonly type = LoginActionTypes.LoginRequest;
    constructor(public payload: LoginInfo){}
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;
    constructor(public payload: ILoginResponse){}
}

export class LoginError implements Action {
    readonly type = LoginActionTypes.LoginError;
    constructor(public payload: ILoginResponse){}
}

export class LoginSuccessNavigate implements Action {
    readonly type = LoginActionTypes.LoginSuccessNavigate;
}

export type LoginActions = LoginRequest | LoginSuccess | LoginError;