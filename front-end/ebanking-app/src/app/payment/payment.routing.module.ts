import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentConfirmationComponent } from '@app/payment/containers/payment-confirmation/payment-confirmation.component';
import { PaymentComponent } from '@app/payment/containers/payment/payment.component';
import { PaymentGuard } from '@app/payment/guards/payment.guard';

export const ROUTES = [
    { path: 'pay', component: PaymentComponent, canActivate: [ PaymentGuard ] },
    { path: 'confirm-payment', component: PaymentConfirmationComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(ROUTES) ],
    exports: [ RouterModule ]

})
export class PaymentRoutingModule {
}
