import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./containers/dashboard.component";
import { StoreModule } from "@ngrx/store";
import { accountsReducer } from "./reducers/accounts.reducer";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('accounts', accountsReducer)
    ],
    declarations: [DashboardComponent],
    providers: []
})

export class DashboardModule { }