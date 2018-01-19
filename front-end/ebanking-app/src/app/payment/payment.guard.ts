import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {of} from "rxjs/observable/of";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {combineLatest} from "rxjs/observable/combineLatest";
import { State } from "../reducer";
import { InitPaymentRequest } from "./reducers/payment.actions";
import { RequestAccounts } from "../dashboard/reducers/account.actions";
import { RequestPayees } from "./reducers/payee.actions";
import * as fromAccounts from "../dashboard/reducers";
import * as fromPayment from "./reducers";

@Injectable()
export class PaymentGuard implements CanActivate {
    constructor(private store: Store<State>){}

    dataAvailable(): Observable<any> {
        let payementRequest$ = this.store.select('paymentRequest').do(d => {
            if(!d) {
                this.store.dispatch(new InitPaymentRequest());
            }
        }).filter(d => !!d);
        let accounts$ = this.store.select(fromAccounts.getAccountsState).do(d => {
            if(!d || (!d.accountLoading && d.accounts && d.accounts.length === 0)) {
                console.log('Requesting accounts ...');
                this.store.dispatch(new RequestAccounts());
            }
        }).filter(d => d && !d.accountLoading);

        let payees$ = this.store.select(fromPayment.getPayeesState).do(d => {
            if(!d) {
                this.store.dispatch(new RequestPayees());
            }
        }).filter(d => d && !d.payeesLoading);
        return combineLatest(payementRequest$, accounts$, payees$).take(1);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.dataAvailable().switchMap(() => of(true)).catch((e) => {
            console.log('The error ', e);
            return of(false);
        });
    }

}