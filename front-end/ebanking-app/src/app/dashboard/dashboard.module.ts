import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./containers/dashboard.component";
import { StoreModule } from "@ngrx/store";
import { accountsReducer } from "./reducers/accounts.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AccountEffects } from "./reducers/account.effects";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('accounts', accountsReducer),
        EffectsModule.forFeature([AccountEffects])
    ],
    declarations: [DashboardComponent],
    providers: []
})

export class DashboardModule { }