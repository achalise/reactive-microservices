import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app.routing.module';
import * as fromRoot from '@app/store';
import { UiWidgetsModule } from '@app/ui-widgets/ui-widgets.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CommonInterceptor } from './core/interceptors/common.interceptor';
import { LoginEffects } from './navigation/login/state/login.effects';
import { NavigationModule } from './navigation/navigation.module';


const angularImports = [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        angularImports,
        CoreModule.forRoot(),
        NgbModule.forRoot(),
        UiWidgetsModule.forRoot(),
        StoreModule.forRoot(fromRoot.reducers, { metaReducers: [ fromRoot.stateLogger ] }),
        EffectsModule.forRoot([ fromRoot.ConfigEffects, LoginEffects ]),
        NavigationModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        })
    ],
    providers: [ {
        provide: HTTP_INTERCEPTORS,
        useClass: CommonInterceptor,
        multi: true
    } ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
