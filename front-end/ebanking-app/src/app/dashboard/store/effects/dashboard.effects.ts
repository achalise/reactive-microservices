import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppCurrentStateAccountSelectedAction, AppCurrentStateActionTypes } from '@app/store/actions';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AccountService } from 'app/core/accounts/account.service';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { DashboardActionTypes, RequestAccountsComplete } from '../actions';

@Injectable()
export class AccountEffects {

    constructor(private router: Router,
                private actions$: Actions,
                private accountService: AccountService) {
    }

    @Effect() loadAccounts$: Observable<Action> = this.actions$.ofType(DashboardActionTypes.RequestAccounts).pipe(
        switchMap(() => this.accountService.getFromAccounts()),
        map(accounts => new RequestAccountsComplete(accounts)));

    @Effect({dispatch: false}) selectAccount = this.actions$.ofType(AppCurrentStateActionTypes.AppCurrentStateAccountSelectedAction).pipe(
        tap(() => {
            this.router.navigate(['account']);
        })
    )

}
