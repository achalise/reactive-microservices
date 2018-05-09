import { Account } from '@app/core/accounts/account';
import { loginReducer } from '@app/navigation/login/state/login.reducer';
import { appCurrentStateReducer } from '@app/store/reducers/app-current-state.reducer';
import { configDataReducer } from '@app/store/reducers/configDataReducer';
import { AuthStatus } from 'app/core/models';

// TODO Starting point for our app state, need to discuss to come up with final shape
export interface State {
    authState: IAuthenticationState;
    configDataState: ConfigDataState;
    appCurrentState: AppCurrentState;
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

export interface AppCurrentState {
    selectedAccount: Account
}

export const reducers = {
    authState: loginReducer,
    configDataState: configDataReducer,
    appCurrentState: appCurrentStateReducer
};
