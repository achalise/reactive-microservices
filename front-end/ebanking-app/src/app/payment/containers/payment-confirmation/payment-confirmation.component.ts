import { Component, OnInit } from '@angular/core';
import * as appState from "../../../reducer/index";
import {Store} from "@ngrx/store";
import {Account} from "../../../core/accounts/account";
import {Payee} from "../../../core/accounts/payee";
import {Router} from "@angular/router";
import {SubmitPaymentRequest} from "../../reducers/payment.actions";

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {

  amount: number;
  fromAccount: Account;
  toAccount: Payee;
  notes: string;
  paymentDate: Date;

  constructor(private store: Store<appState.State>, private router: Router) { }

  ngOnInit() {
      this.store.select('paymentRequest').filter(t => !!t).subscribe(v => {
        this.amount = v.amount;
        this.fromAccount = v.fromAccount;
        this.toAccount = v.toAccount;
        this.notes = v.notes;
        this.paymentDate = new Date(v.paymentDate.year, v.paymentDate.month, v.paymentDate.day);
      });
  }

  submit() {
    console.log('submitted payment: ');
    this.store.dispatch(new SubmitPaymentRequest());
  }

  cancel() {
    this.router.navigate(['pay']);
  }

}
