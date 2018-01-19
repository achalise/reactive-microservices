import { Observable } from "rxjs/Rx";
import { PaymentActionTypes, SubmitPaymentSuccess, SubmitPaymentSuccessNavigate } from "./payment.actions";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { PaymentService } from "../../core/payment/payment.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PaymentEffects {

    constructor(
        private router: Router,
        private actions$: Actions,
        private paymentService: PaymentService
    ) { }

    @Effect() submitPayment$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequest).pipe(
        switchMap(() => this.paymentService.submitPayment()),
        map((paymentResponse) => new SubmitPaymentSuccess(paymentResponse))
    );

    @Effect() submitPaymentSuccess$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequestSuccess).pipe(
        tap(() => {this.router.navigate(['dashboard'])}),
        map(() => new SubmitPaymentSuccessNavigate())
    );
}