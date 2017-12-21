import {Account} from "../core/accounts/account";

export interface State {
    counter: number,
    accounts: Account[],
    accountLoading: boolean
}