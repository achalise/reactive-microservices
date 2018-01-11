import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmationComponent } from './payment-confirmation.component';
import {payeesReducer} from "../dashboard/state/payees.reducer";
import {accountsReducer} from "../dashboard/state/accounts.reducer";
import {reducer} from "../redux-example/reducer/counter";
import {Store, StoreModule} from "@ngrx/store";
import {paymentRequestReducer} from "../payment/state/payment.request.reducer";
import {AppRoutingModule} from "../app.routing.module";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {PaymentComponent} from "../payment/payment.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {APP_BASE_HREF} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {State} from "../reducers";

describe('PaymentConfirmationComponent', () => {
  let component: PaymentConfirmationComponent;
  let fixture: ComponentFixture<PaymentConfirmationComponent>;
  let store: Store<State>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentConfirmationComponent, DashboardComponent, PaymentComponent ],
      imports: [
          HttpClientTestingModule,
          AppRoutingModule,
          NgbModule.forRoot(),
          StoreModule.forRoot({paymentRequest: paymentRequestReducer}, {initialState: initialState})
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationComponent);
    store =fixture.debugElement.injector.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate data with from payment request from the store', () => {
    expect(component.fromAccount.accountNumber).toEqual('111');
  })
});

var initialState = {
  paymentRequest : {
    fromAccount: {accountNumber: '111'},
    toAccount: {accountNumber: '222'},
    paymentDate: {year: 2018, month: 1, day: 11}
  }
}