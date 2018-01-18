import { LoginComponent } from "./navigation/login/login.component";
import { PaymentConfirmationComponent } from "./payment/containers/payment-confirmation/payment-confirmation.component";
import { HomeLayoutComponent } from "./navigation/home-layout/home-layout.component";
import { AuthGuard } from "./core/auth.guard";
import { PaymentComponent } from "./payment/containers/payment/payment.component";
import { Routes } from "@angular/router";
import { LoginLayoutComponent } from "./navigation/login-layout/login-layout.component";
import { DashboardComponent } from "./dashboard/containers/dashboard.component";
import { PaymentGuard } from "./payment/payment.guard";

export const routes: Routes = [
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