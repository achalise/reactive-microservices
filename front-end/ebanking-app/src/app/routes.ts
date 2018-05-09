import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { HomeLayoutComponent } from './navigation/home-layout/home-layout.component';
import { LoginLayoutComponent } from './navigation/login-layout/login-layout.component';
import { LoginComponent } from './navigation/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginLayoutComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: HomeLayoutComponent,
        canActivate: [ AuthGuard ],
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'account',
        component: HomeLayoutComponent,
        canActivate: [ AuthGuard ],
        loadChildren: './accounts/accounts.module#AccountsModule'
    },
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [ AuthGuard ],
        loadChildren: './payment/payment.module#PaymentModule'
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
