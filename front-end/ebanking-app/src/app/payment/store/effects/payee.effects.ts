import { Injectable } from '@angular/core';
import { AccountService } from '@app/core/accounts/account.service';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PayeeActionTypes, RequestPayeesComplete } from '../actions/payee.actions';

@Injectable()
export class PayeeEffects {
    
    constructor(private actions$: Actions,
                private accountService: AccountService) {
    }
    
    @Effect()
    loadPayees$: Observable<Action> = this.actions$.ofType(PayeeActionTypes.RequestPayees).pipe(
        switchMap(() => this.accountService.getPayees()),
        map(payees => new RequestPayeesComplete(payees)));
}
