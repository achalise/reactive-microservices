import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AccountService } from 'app/core/accounts/account.service';
import {
    AccountActionTypes, RequestAccountsComplete
} from '../actions/account.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {
    map,
    switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AccountEffects {

    constructor(private router: Router,
                private actions$: Actions,
                private accountService: AccountService) {
    }

    @Effect() loadAccounts$: Observable<Action> = this.actions$.ofType(AccountActionTypes.RequestAccounts).pipe(
        switchMap(() => this.accountService.getFromAccounts()),
        map(accounts => new RequestAccountsComplete(accounts)));

}
