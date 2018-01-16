import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from "./payment/payment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {PaymentGuard} from "./payment/state/payment.guard";
import {PaymentConfirmationComponent} from "./payment-confirmation/payment-confirmation.component";
import {HomeLayoutComponent} from "./home-layout/home-layout.component";
import {LoginLayoutComponent} from "./login-layout/login-layout.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./core/auth.guard";


// const routes1: Routes = [
//     {path: 'dashboard', component: DashboardComponent},
//     {
//         path: 'pay',
//         component: PaymentComponent,
//         canActivate: [PaymentGuard]
//     },
//     {path: 'confirm-payment', component: PaymentConfirmationComponent},
//     {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
// ];

const routes: Routes = [
    {
        path: 'welcome',
        component: LoginLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'confirm-payment', component: PaymentConfirmationComponent},
            {path: 'pay', component: PaymentComponent, canActivate: [PaymentGuard]},
            {path: 'dashboard', component: DashboardComponent}
        ]
    },
    {path: '**', redirectTo: '/welcome/login', pathMatch: 'full'}
];

@NgModule ({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}
