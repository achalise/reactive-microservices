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

    }
    this.createForm();

    this.paymentForm.get('fromAccount').valueChanges.forEach(s => console.log(s));
  }

  ngOnInit() {
    this.fromAccounts = this.accountService.getFromAccounts();
  }

  ngOnChanges(): void {
    console.log(`new value ${this.paymentForm}`);
  }


  private createForm() {
    this.paymentForm = this.fb.group({
      fromAccount: 'some'
    });
  }

}
