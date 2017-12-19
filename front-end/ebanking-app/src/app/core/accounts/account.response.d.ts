import { Account } from "./account"

export interface IAccountListResponse {
    cashAccounts : Account[],
    cardAccounts: Account[],
    mortgageAccounts: Account[]
}