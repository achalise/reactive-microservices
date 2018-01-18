import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {AccountService} from "../../core/accounts/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {payeesReducer} from "../../payment/reducers/payees.reducer";
import {accountsReducer} from "../reducers/accounts.reducer";
import {Store, StoreModule} from "@ngrx/store";
import {paymentRequestReducer} from "../../payment/reducers/payment.request.reducer";
import {State} from "../../reducer/index";
import {RequestAccounts, RequestAccountsComplete} from "../reducers/account.actions";
import {Account} from "../../core/accounts/account";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [AccountService],
      imports: [HttpClientTestingModule,
          StoreModule.forRoot({accounts: accountsReducer, payees: payeesReducer, paymentRequest: paymentRequestReducer})]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action to load accounts when created', () => {
      const action = new RequestAccounts();
      expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display accounts once acccounts loaded in the store', () => {
      const successaction = new RequestAccountsComplete([new Account('134', 'test',
          'Test User Name', '123123', 'CASH', 1000, 4, 2)]);
      store.dispatch(successaction);
      component.accounts$.subscribe(accounts => {
          expect(accounts.length).toEqual(1);
          expect(accounts[0].accountNumber).toEqual('123123');
      });
      fixture.detectChanges();
      const s = fixture.debugElement.nativeElement;
      const ts = s.querySelectorAll('tbody tr td');
      expect(ts[2].textContent.trim()).toEqual('123123');
  });
});
