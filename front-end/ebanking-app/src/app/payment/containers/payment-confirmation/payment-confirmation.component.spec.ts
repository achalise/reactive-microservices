import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '@app/app.routing.module';
import { DashboardComponent } from '@app/dashboard/containers/dashboard.component';
import { HomeLayoutComponent } from '@app/navigation/home-layout/home-layout.component';
import { LoginLayoutComponent } from '@app/navigation/login-layout/login-layout.component';
import { LoginComponent } from '@app/navigation/login/login.component';
import { paymentRequestReducer } from '@app/payment/store/reducers/payment.request.reducer';
import { State } from '@app/store/reducers/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';
import { PaymentComponent } from '../payment/payment.component';

import { PaymentConfirmationComponent } from './payment-confirmation.component';

describe('PaymentConfirmationComponent', () => {
    let component: PaymentConfirmationComponent;
    let fixture: ComponentFixture<PaymentConfirmationComponent>;
    let store: Store<State>;

    beforeEach(async(() => {
        // TODO use mock routing module, so that following declaration will not need to include all these additional components
        TestBed.configureTestingModule({
                declarations: [ PaymentConfirmationComponent, DashboardComponent, PaymentComponent, LoginLayoutComponent, LoginComponent, HomeLayoutComponent ],
                imports: [
                    HttpClientTestingModule,
                    AppRoutingModule,
                    NgbModule.forRoot(),
                    StoreModule.forRoot([]),
                    StoreModule.forFeature('payment', { paymentRequest: paymentRequestReducer }, { initialState: initialState })
                ],
                providers: [ { provide: APP_BASE_HREF, useValue: '/' } ],
                schemas: [ NO_ERRORS_SCHEMA ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentConfirmationComponent);
        store = fixture.debugElement.injector.get(Store);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate data with from payment request from the store', () => {
        expect(component.fromAccount.accountNumber).toEqual('111');
    });
});

const initialState = {
    paymentRequest: {
        fromAccount: { accountNumber: '111' },
        toAccount: { accountNumber: '222' },
        paymentDate: { year: 2018, month: 1, day: 11 }
    }
};
