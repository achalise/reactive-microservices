import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '@app/dashboard/dashboard.routing.module';
import { UiWidgetsModule } from '@app/ui-widgets/ui-widgets.module';
import * as fromContainers from './containers';
import { StoreModule } from '@ngrx/store';
import * as fromAccounts from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        UiWidgetsModule,
        StoreModule.forFeature('dashboard', fromAccounts.dashboardReducer),
        EffectsModule.forFeature([ fromAccounts.AccountEffects ])
    ],
    declarations: [ fromContainers.DashboardComponent ],
    providers: []
})

export class DashboardModule {
    constructor() {
        console.log('Lazily loaded Dashboard module ..');
    }
}
