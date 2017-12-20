import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from "./payment/payment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'pay', component: PaymentComponent},
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule ({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}
