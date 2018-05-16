import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '@app/core/accounts/account';
import { Payee } from '@app/core/accounts/payee';
import { PaymentRequestModel } from '@app/payment/models/payment-request.model';
import { PaymentRequest } from '@app/payment/store';
import * as fromPayement from '@app/payment/store/';
import { SubmitPaymentRequest } from '@app/payment/store/actions/payment.actions';
import * as appState from '@app/store/reducers/index';
import { Store } from '@ngrx/store';

@Component({
    selector: 'eb-payment-confirmation',
    templateUrl: './payment-confirmation.component.html',
    styleUrls: [ './payment-confirmation.component.scss' ]
})
export class PaymentConfirmationComponent implements OnInit {

    amount: number;
    fromAccount: Account;
    toAccount: Payee;
    notes: string;
    paymentDate: Date;

    constructor(private store: Store<appState.State>, private router: Router) {
    }

    ngOnInit() {
        this.store.select(fromPayement.getPaymentRequest).filter(t => !!t).subscribe(v => {
            this.amount = v.amount;
            this.fromAccount = v.fromAccount;
            this.toAccount = v.toAccount;
            this.notes = v.notes;
            this.paymentDate = new Date(v.paymentDate.year, v.paymentDate.month, v.paymentDate.day);
        });
    }

    submit() {
        console.log('submitted payment: ');
        const paymentRquest: PaymentRequestModel = new PaymentRequestModel(this.fromAccount.id,
            this.paymentDate, this.fromAccount.accountType, this.fromAccount.accountNumber, this.amount,
            this.notes, this.toAccount.id, this.toAccount.billerCode,
            this.toAccount.billerReferenceNo, null, this.toAccount.accountNumber, 'Internal Transfer');
        this.store.dispatch(new SubmitPaymentRequest(paymentRquest));
    }

    cancel() {
        this.router.navigate([ 'pay' ]);
    }

}
