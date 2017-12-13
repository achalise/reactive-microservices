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


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    PaymentComponent,
    FromAccountComponent,
    ToAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ AccountService, {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
  } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
