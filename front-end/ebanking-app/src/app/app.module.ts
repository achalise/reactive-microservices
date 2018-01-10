import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { PaymentComponent } from './payment/payment.component';
import { AppRoutingModule } from './app.routing.module';
import { AccountService } from "./core/accounts/account.service";
import { CommonInterceptor } from "./core/interceptors/common.interceptor"
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FromAccountComponent } from './payment/from-account/from-account.component';
import { ToAccountComponent } from './payment/to-account/to-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from "@ngrx/store";
import { ReduxExampleComponent } from './redux-example/redux-example.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './redux-example/reducer/counter';
import { AccountEffects } from "./dashboard/state/account.effects";
import {EffectsModule} from "@ngrx/effects";
import {accountsReducer} from "./dashboard/state/accounts.reducer";
import { NavSearchComponent } from './app-navbar/nav-search/nav-search.component';
import {PaymentGuard} from "./payment/state/payment.guard";
import {paymentRequestReducer} from "./payment/state/payment.request.reducer";
import {payeesReducer} from './dashboard/state/payees.reducer';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { PaymentService } from './core/payment/payment.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    PaymentComponent,
    FromAccountComponent,
    ToAccountComponent,
    DashboardComponent,
    ReduxExampleComponent,
    NavSearchComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({counter: reducer, accounts: accountsReducer, payees: payeesReducer, paymentRequest: paymentRequestReducer}),
    EffectsModule.forRoot([AccountEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [  AccountService, AccountEffects, {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
  }, PaymentGuard, PaymentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
