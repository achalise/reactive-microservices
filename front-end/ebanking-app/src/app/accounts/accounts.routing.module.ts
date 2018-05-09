import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountDetailsComponent } from '@app/accounts/containers/account-details/account-details.component';

export const ACCOUNT_ROUTES = [
    { path: '', component: AccountDetailsComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(ACCOUNT_ROUTES) ],
    exports: [ RouterModule ]

})
export class AccountsRoutingModule {
}
