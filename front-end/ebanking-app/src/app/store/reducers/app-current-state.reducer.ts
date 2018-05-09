import { AppCurrentStateAccountSelectedAction,
    AppCurrentStateActions,
    AppCurrentStateActionTypes } from '@app/store/actions/app-current-state.actions';
import { AppCurrentState } from '@app/store/reducers/index';

export function appCurrentStateReducer(state: AppCurrentState, action: AppCurrentStateActions) {
    switch (action.type) {
        case AppCurrentStateActionTypes.AppCurrentStateAccountSelectedAction:
            let theAction = action as AppCurrentStateAccountSelectedAction;
            return { ...state, selectedAccount: theAction.payload };
        default:
            return state;
    }
}
