import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { PaymentComponent } from './payment/payment.component';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
