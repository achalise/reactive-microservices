import { State } from '@app/store';
import { AppCurrentState } from '@app/store/reducers';
import { createSelector } from '@ngrx/store';

export const getAppCurrentState = (state: State) => state.appCurrentState;
export const getSelectedAccount = createSelector(getAppCurrentState, (state: AppCurrentState)  => state.selectedAccount);