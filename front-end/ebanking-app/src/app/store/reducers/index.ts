import { loginReducer } from '@app/navigation/login/state/login.reducer';
import { configDataReducer } from '@app/store/reducers/configDataReducer';
import { AuthStatus } from 'app/core/models';

// TODO Starting point for our app state, need to discuss to come up with final shape
export interface State {
    authState: IAuthenticationState;
    configDataState: ConfigDataState;
}

export interface IAuthenticationState {
    status: AuthStatus;
    errorCode: string;
    message: string;
    qrData: string;
}

// TODO we need to come up with shape for config data

export interface ConfigDataState {
    configStatus: string;
    cssLoaded?: boolean;
    configData: ConfigData;
}

export interface ConfigData {
    brand: string;
}

export const reducers = {
    authState: loginReducer,
    configDataState: configDataReducer
};
