import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { CommonInterceptor } from "./core/interceptors/common.interceptor"
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountEffects } from "./dashboard/reducers/account.effects";
import { EffectsModule } from "@ngrx/effects";
import { accountsReducer } from "./dashboard/reducers/accounts.reducer";
import { paymentRequestReducer } from "./payment/reducers/payment.request.reducer";
import { payeesReducer } from './payment/reducers/payees.reducer';
import { loginReducer } from "./navigation/login/state/login.reducer";
import { LoginEffects } from "./navigation/login/state/login.effects";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PaymentModule } from "./payment/payment.module";
import { NavigationModule } from "./navigation/navigation.module";
import { CommonModules } from "./common.modules";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModules,
    CoreModule.forRoot(),
    NgbModule.forRoot(),
    StoreModule.forRoot({
        payees: payeesReducer,
        paymentRequest: paymentRequestReducer,
        authState: loginReducer
    }),
    EffectsModule.forRoot([AccountEffects, LoginEffects]),
    NavigationModule,
    DashboardModule,
    PaymentModule,
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
export class AppModule { }
