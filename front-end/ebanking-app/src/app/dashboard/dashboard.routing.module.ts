import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/containers/dashboard.component';

export const ROUTES = [
    { path: '', component: DashboardComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(ROUTES) ],
    exports: [ RouterModule ]

})
export class DashboardRoutingModule {
}
