import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import { AccountEffects } from "./state/account.effects";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DashboardComponent],
    providers: []
})

export class DashboardModule { }