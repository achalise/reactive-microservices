import {Injectable} from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import {AccountService} from "../../core/accounts/account.service";

import {
    PayeeActionTypes, RequestPayeesComplete
} from "./payee.actions";

import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {
    map,
    switchMap
} from 'rxjs/operators';

@Injectable()
export class AccountEffects {

    constructor(
        private actions$: Actions,
        private accountService: AccountService
    ) { }

    @Effect()
    loadPayees$: Observable<Action> = this.actions$.ofType(PayeeActionTypes.RequestPayees).pipe(
        switchMap(() => this.accountService.getPayees()),
        map(payees => new RequestPayeesComplete(payees)));
}