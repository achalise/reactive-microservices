import { DashBoardState } from '@app/dashboard/store';
import * as fromRoot from '@app/store/reducers/index';

export * from './dashboard.reducer';

export interface State extends fromRoot.State {
    accountsState: DashBoardState;
}
