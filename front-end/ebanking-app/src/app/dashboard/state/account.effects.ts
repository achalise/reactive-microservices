import {Injectable} from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import {AccountService} from "../../core/accounts/account.service";
import {AccountActions, RequestAccounts, AccountActionTypes, RequestAccountsComplete} from "./account.actions";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {
    debounceTime,
    map,
    switchMap,
    skip,
    takeUntil,
    catchError,
} from 'rxjs/operators';

@Injectable()
export class AccountEffects {

    constructor(
        private actions$: Actions,
        private accountService: AccountService
    ) { }

    @Effect()
    loadAccounts$: Observable<Action> = this.actions$.ofType(AccountActionTypes.RequestAccounts).pipe(
        switchMap(() => this.accountService.getFromAccounts()),
        map(accounts => new RequestAccountsComplete(accounts)));
}