import {Injectable} from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import {AccountService} from "../../core/accounts/account.service";
import {
    AccountActions, RequestAccounts, AccountActionTypes, RequestAccountsComplete,
    RequestPayeesComplete
} from "./account.actions";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {
    debounceTime,
    map,
    switchMap,
    skip,
    takeUntil,
    catchError,
    tap
} from 'rxjs/operators';
import {
    PaymentActionTypes, SubmitPaymentSuccess,
    SubmitPaymentSuccessNavigate
} from "../../payment/reducers/payment.actions";
import {PaymentService} from "../../core/payment/payment.service";
import {Router} from "@angular/router";

@Injectable()
export class AccountEffects {

    constructor(
        private router: Router,
        private actions$: Actions,
        private accountService: AccountService,
        private paymentService: PaymentService
    ) { }

    @Effect() loadAccounts$: Observable<Action> = this.actions$.ofType(AccountActionTypes.RequestAccounts).pipe(
        switchMap(() => this.accountService.getFromAccounts()),
        map(accounts => new RequestAccountsComplete(accounts)));

    @Effect() loadPayees$: Observable<Action> = this.actions$.ofType(AccountActionTypes.RequestPayees).pipe(
        switchMap(() => this.accountService.getPayees()),
        //Do something else to handle error
        catchError(() => Observable.throw('error')),
        map(payees => new RequestPayeesComplete(payees)));

    @Effect() submitPayment$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequest).pipe(
        switchMap(() => this.paymentService.submitPayment()),
        map((paymentResponse) => new SubmitPaymentSuccess(paymentResponse))
    );

    @Effect() submitPaymentSuccess$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequestSuccess).pipe(
        tap(() => {this.router.navigate(['dashboard'])}),
        map(() => new SubmitPaymentSuccessNavigate())
    );
}