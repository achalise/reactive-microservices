import {Component, OnInit, OnChanges} from '@angular/core';
import {Account} from "../core/accounts/account";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AccountService} from "../core/accounts/account.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {

  private fromAccounts: Account[];

  private paymentRequest: any;
  private paymentForm: FormGroup;
  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.paymentRequest = {
      fromAccount: null,
      toAccount: null,
      startDate: null,
      amount: null,
      notes: null
    };
    this.createForm();

    this.paymentForm.get('fromAccount').valueChanges.forEach(s => console.log(s));
  }

  ngOnInit() {
    this.accountService.getFromAccounts().subscribe(d => {
      this.fromAccounts = d;
      console.log(`From accounts: ${this.fromAccounts}`);
    }, error => {
      console.log(`Error when retrieving accounts`);
    }, () => {
      console.log(`Completed retrieving accounts`);
    })
  }

  ngOnChanges(): void {
    console.log(`new value ${this.paymentForm}`);
  }

  accountSelected(event: Account) {
    console.log(`The form: `, this.paymentForm);
    console.log(`Account selected was `, event.accountName);
  }

  payeeSelected(event: Account) {
    console.log(`Payee selected was`, event);
  }


  private createForm() {
    this.paymentForm = this.fb.group({
      fromAccount: this.paymentRequest.fromAccount,
      toAccount: this.paymentRequest.toAccount,
      startDate: this.paymentRequest.startDate,
      amount: this.paymentRequest.amount,
      notes: this.paymentRequest.notes
    });
  }

}
