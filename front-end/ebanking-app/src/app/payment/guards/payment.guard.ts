import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import * as fromAccounts from '@app/dashboard/store';
import { RequestAccounts } from '@app/dashboard/store';
import { State } from '@app/store/reducers/index';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import * as fromPayment from '../store';
import { InitPaymentRequest, RequestPayees } from '../store';

@Injectable()
export class PaymentGuard implements CanActivate {
    constructor(private store: Store<State>) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.dataAvailable().switchMap(() => of(true)).catch((e) => {
            console.log('The error ', e);
            return of(false);
        });
    }

    private dataAvailable(): Observable<any> {
        let payementRequest$ = this.store.select(fromPayment.getPaymentRequest).do(d => {
            if (!d) {
                this.store.dispatch(new InitPaymentRequest());
            }
        }).filter(d => !!d);
        const accounts$ = this.store.select(fromAccounts.getAccountsState).do(d => {
            if (!d || (!d.accountLoading && d.accounts && d.accounts.length === 0)) {
                console.log('Requesting accounts ...');
                this.store.dispatch(new RequestAccounts());
            }
        }).filter(d => d && !d.accountLoading);

        const payees$ = this.store.select(fromPayment.getPayeesState).do(d => {
            if (!d) {
                console.log('Requesting payees ....');
                this.store.dispatch(new RequestPayees());
            }
        }).filter(d => d && !d.payeesLoading);
        return combineLatest(payementRequest$, accounts$, payees$).take(1);
    }
}

