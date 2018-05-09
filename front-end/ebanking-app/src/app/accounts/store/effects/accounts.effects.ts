import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    AccountsActions,
    AccountsActionTypes,
    AccountTransactionsLoadedAction,
    LoadAccountTransactionsAction
} from '@app/accounts/store/actions/accounts.actions';
import { AccountService } from '@app/core/accounts/account.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AccountsEffects {

    constructor(private router: Router, private actions$: Actions, private accountsService: AccountService) {
    }

    @Effect() loadAccountTransactions: Observable<AccountsActions> = this.actions$.ofType(AccountsActionTypes.LoadAccountTransactionsAction).pipe(
        tap((action) => {
            console.log(`Processing action `, action)
        }),
        switchMap((action) => {
            const theAction: LoadAccountTransactionsAction = action as LoadAccountTransactionsAction;
            return this.accountsService.getTransactions(theAction.account).pipe(map((txns) => {
                return {
                    accountId: theAction.account.id,
                    txns: txns
                }
            }));
        }),
        map((txnsForAccount) => {
            return new AccountTransactionsLoadedAction({
                accountId: txnsForAccount.accountId,
                transactions: txnsForAccount.txns
            });
        })
    );
}
