import {IAuthenticationState} from "../../../reducer/index";
import {LoginActions, LoginActionTypes, LoginError} from "./login.actions";
import {AuthStatus} from "../../../core/models/login.info";

export function loginReducer(state: IAuthenticationState = {status: AuthStatus.UNAUTHENTICATED, errorCode: null, message: null}, action: LoginActions) {
    switch (action.type) {
        case LoginActionTypes.LoginRequest:
            return {...state, status: AuthStatus.AUTHENTICATING};
        case LoginActionTypes.LoginSuccess:
            return {...state, status: AuthStatus.AUTHENTICATED, message: null};
        case LoginActionTypes.LoginError:
            let loginResp = action as LoginError;
            return {...state, status: AuthStatus.UNAUTHENTICATED, message: loginResp.payload.message}
        default:
            return state;
    }
}