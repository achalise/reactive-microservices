import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from "./payment/payment.component";

const routes: Routes = [
    {path: '', component: PaymentComponent},
    {path: 'payment', component: PaymentComponent}
]

@NgModule ({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}
