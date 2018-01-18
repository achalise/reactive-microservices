import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentComponent} from "./containers/payment/payment.component";
import {PaymentConfirmationComponent} from "./containers/payment-confirmation/payment-confirmation.component";
import {FromAccountComponent} from "./components/from-account/from-account.component";
import {ToAccountComponent} from "./components/to-account/to-account.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ],
    declarations: [PaymentComponent, PaymentConfirmationComponent, FromAccountComponent, ToAccountComponent]
})

export class PaymentModule { }