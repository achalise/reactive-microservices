import { ConfigData } from '@app/store/reducers';
import { Action } from '@ngrx/store';

export enum ConfigActionTypes {
    ConfigLoadAction = '[Config Data] - Load',
    ConfigLoadSuccessAction = '[Config Data] - Load success',
    CSSLoadedAction = '[Config Data]- CSS Load Completed'
}

export class ConfigLoadAction implements Action {
    readonly type = ConfigActionTypes.ConfigLoadAction;
}

export class ConfigLoadSuccessAction implements Action {
    readonly type = ConfigActionTypes.ConfigLoadSuccessAction;
    constructor(public payload: ConfigData) {
    }
}

export class CSSLoadedAction implements Action {
    readonly type = ConfigActionTypes.CSSLoadedAction;
}

export type ConfigActions = ConfigLoadAction | ConfigLoadSuccessAction | CSSLoadedAction;
