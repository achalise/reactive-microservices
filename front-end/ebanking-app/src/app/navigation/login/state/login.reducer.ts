import { IAuthenticationState } from '@app/store/reducers';
import { Login2FA, LoginActions, LoginActionTypes, LoginError } from './login.actions';
import { AuthStatus } from '@app/core/models';

export function loginReducer(state: IAuthenticationState = {
    status: AuthStatus.UNAUTHENTICATED,
    errorCode: null,
    message: null,
    qrData: null

}, action: LoginActions) {
    switch (action.type) {
        case LoginActionTypes.LoginRequest:
            return { ...state, status: AuthStatus.AUTHENTICATING };
        case LoginActionTypes.LoginSuccess:
            return { ...state, status: AuthStatus.AUTHENTICATED, message: null };
        case LoginActionTypes.Login2FA:
            const act = action as Login2FA;
            return { ...state, status: AuthStatus.AUTHENTICATED_2FA, message: act.payload.message, qrData: act.payload.qrData };
        case LoginActionTypes.LoginError:
            const loginResp = action as LoginError;
            return { ...state, status: AuthStatus.UNAUTHENTICATED, message: loginResp.payload.message };
        default:
            return state;
    }
}
