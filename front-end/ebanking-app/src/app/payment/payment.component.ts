import {Component, OnInit, OnChanges} from '@angular/core';
import {Account} from "../core/accounts/account";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AccountService} from "../core/accounts/account.service";
import * as appState from "../reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {InitPaymentRequest, UpdateFromAccount, UpdateToAccount} from "./state/payment.actions";
import { map } from "rxjs/operator/map";
import { filter } from "rxjs/operator/filter";
import {RequestPayees} from "../dashboard/state/account.actions";
import {Payee} from "../core/accounts/payee";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {

  protected paymentForm: FormGroup;

  protected paymentRequest$: Observable<appState.PaymentRequest>;

  protected fromAccounts$ : Observable<Account[]>;
  protected fromAccount$: Observable<Account>;

  protected toAccounts$: Observable<Payee[]>;
  protected toAccount$: Observable<Payee>;

  constructor( private accountService: AccountService,
               private fb: FormBuilder,
               private store: Store<appState.State>) {


  }

  ngOnInit() {

    this.store.dispatch(new RequestPayees());
    this.store.dispatch(new InitPaymentRequest());
    this.paymentRequest$ = this.store.select('paymentRequest');
    this.fromAccounts$ = this.store.select('accounts').map((t: appState.AccountsState) => t.accounts);
    this.fromAccount$ = map.call(filter.call(this.paymentRequest$, t => !!t), t => t.fromAccount);

    this.toAccounts$ = this.store.select('payees').map((t: appState.PayeesState) => t.payees);
    this.toAccount$ = this.paymentRequest$.filter(t => !!t).map(t => t.toAccount);

    this.createForm();

  }

  ngOnChanges(): void {
    console.log(`new value ${this.paymentForm}`);
  }

  accountSelected(event: Account) {
    console.log(`The form: `, this.paymentForm);
    console.log(`Account selected was `, event.accountName);
    this.store.dispatch(new UpdateFromAccount(event));
  }

  payeeSelected(payee: Payee) {
    console.log(`Payee selected was`, payee);
    this.store.dispatch(new UpdateToAccount(payee));
  }


  private createForm() {
    this.paymentForm = this.fb.group({
      fromAccount: null,
      toAccount: null,
      startDate: null,
      amount: null,
      notes: null
    });
  }

}
