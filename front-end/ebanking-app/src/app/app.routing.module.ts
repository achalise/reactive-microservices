import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from "./payment/payment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {PaymentGuard} from "./payment/state/payment.guard";


const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'pay', component: PaymentComponent, canActivate: [PaymentGuard]},
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule ({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}
