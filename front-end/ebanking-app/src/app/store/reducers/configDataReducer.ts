import { ConfigActions, ConfigActionTypes, ConfigLoadSuccessAction } from '@app/store/actions/config.actions';
import { ConfigDataState } from '@app/store/reducers/index';

export function configDataReducer(state: ConfigDataState, action: ConfigActions): ConfigDataState {
    switch (action.type) {
        case ConfigActionTypes.ConfigLoadAction:
            return { ...state, configStatus: 'LOADING' };
        case ConfigActionTypes.ConfigLoadSuccessAction:
            const configAction = action as ConfigLoadSuccessAction;
            return { ...state, configStatus: 'LOADED', configData: configAction.payload };
        case ConfigActionTypes.CSSLoadedAction:
            return {...state, cssLoaded: true };
        default:
            return state;
    }
}
