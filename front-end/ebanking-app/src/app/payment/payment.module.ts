import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentComponent} from "./payment/payment.component";
import {PaymentConfirmationComponent} from "./payment-confirmation/payment-confirmation.component";
import {FromAccountComponent} from "./from-account/from-account.component";
import {ToAccountComponent} from "./to-account/to-account.component";
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