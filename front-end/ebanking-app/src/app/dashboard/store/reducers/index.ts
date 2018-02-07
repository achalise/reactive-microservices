import { AccountsState } from '@app/dashboard/store';
import * as fromRoot from '@app/store/reducers/index';

export * from './accounts.reducer';

export interface State extends fromRoot.State {
    accountsState: AccountsState;
}
