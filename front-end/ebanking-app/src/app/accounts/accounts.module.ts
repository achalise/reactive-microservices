import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsRoutingModule } from '@app/accounts/accounts.routing.module';
import { AccountDetailsComponent } from '@app/accounts/containers/account-details/account-details.component';
import { AccountsEffects } from '@app/accounts/store/effects/accounts.effects';
import { accountsReducer } from '@app/accounts/store/reducers/accounts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [ CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AccountsRoutingModule,
        StoreModule.forFeature('accountsState', accountsReducer ),
        EffectsModule.forFeature([ AccountsEffects ])
    ],
    declarations: [ AccountDetailsComponent ],
    providers: []
})
export class AccountsModule {
    constructor() {
        console.log('Lazily loaded the accounts module');
    }
}