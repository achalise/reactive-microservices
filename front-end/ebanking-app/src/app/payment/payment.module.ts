import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentGuard } from '@app/payment/guards/payment.guard';
import { PaymentRoutingModule } from '@app/payment/payment.routing.module';
import { PaymentService } from '@app/payment/services/payment.service';
import { reducers } from '@app/payment/store';
import { PayeeEffects } from '@app/payment/store/effects/payee.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FromAccountComponent } from './components/from-account/from-account.component';
import { ToAccountComponent } from './components/to-account/to-account.component';
import { PaymentConfirmationComponent } from './containers/payment-confirmation/payment-confirmation.component';
import { PaymentComponent } from './containers/payment/payment.component';
import { PaymentEffects } from './store';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        PaymentRoutingModule,
        StoreModule.forFeature('payment', reducers),
        EffectsModule.forFeature([ PaymentEffects, PayeeEffects ])
    ],
    declarations: [ PaymentComponent, PaymentConfirmationComponent, FromAccountComponent, ToAccountComponent ],
    providers: [ PaymentService, PaymentGuard ]
})

export class PaymentModule {
    constructor() {
        console.log('Lazily loaded payment module ...');
    }
}
