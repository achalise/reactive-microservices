import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentComponent} from "./containers/payment/payment.component";
import {PaymentConfirmationComponent} from "./containers/payment-confirmation/payment-confirmation.component";
import {FromAccountComponent} from "./components/from-account/from-account.component";
import {ToAccountComponent} from "./components/to-account/to-account.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { payeesReducer } from "./reducers/payees.reducer";
import { paymentRequestReducer } from "./reducers/payment.request.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PaymentEffects } from "./reducers/payment.effects";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        StoreModule.forFeature('payment', {payees: payeesReducer, paymentRequest: paymentRequestReducer}),
        EffectsModule.forFeature([PaymentEffects]),
    ],
    declarations: [PaymentComponent, PaymentConfirmationComponent, FromAccountComponent, ToAccountComponent]
})

export class PaymentModule { }