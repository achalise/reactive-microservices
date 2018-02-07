import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PaymentService } from 'app/payment/services/payment.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { PaymentActionTypes, SubmitPaymentSuccess, SubmitPaymentSuccessNavigate } from '../actions/payment.actions';

@Injectable()
export class PaymentEffects {
    
    constructor(private router: Router,
                private actions$: Actions,
                private paymentService: PaymentService) {
    }
    
    @Effect() submitPayment$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequest).pipe(
        switchMap(() => this.paymentService.submitPayment()),
        map((paymentResponse) => new SubmitPaymentSuccess(paymentResponse))
    );
    
    @Effect() submitPaymentSuccess$: Observable<Action> = this.actions$.ofType(PaymentActionTypes.SubmitPaymentRequestSuccess).pipe(
        tap(() => {
            this.router.navigate([ 'dashboard' ]);
        }),
        map(() => new SubmitPaymentSuccessNavigate())
    );
}
