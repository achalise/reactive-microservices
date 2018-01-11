import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {State} from "../../reducers";
import {Injectable} from "@angular/core";
import {InitPaymentRequest} from "./payment.actions";
import {of} from "rxjs/observable/of";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentGuard implements CanActivate {
    constructor(private store: Store<State>){}

    getFromStoreOrApi(): Observable<any> {
        return this.store.select('paymentRequest').do((d) => {
            console.log('payment request = ' + d);
            if (!d) {
                this.store.dispatch(new InitPaymentRequest());
            }
        }).filter((d) => !!d).take(1);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.getFromStoreOrApi().switchMap(() => of(true)).catch(() => of(false));
    }

}