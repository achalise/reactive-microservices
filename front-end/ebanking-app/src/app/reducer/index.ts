import {AuthStatus} from "../core/models/login.info";

export interface State {
    counter: number,
    authState: IAuthenticationState
}

export interface IAuthenticationState {
    status: AuthStatus,
    errorCode: string,
    message: string
}

