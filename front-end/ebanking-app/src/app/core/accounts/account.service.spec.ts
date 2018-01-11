import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { AccountService } from './account.service';
import {Observable} from "rxjs/Observable";
import {Account} from "./account";


describe('AccountService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(AccountService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const accounts: Observable<Account[]> = service.getFromAccounts();
    accounts.subscribe((accounts) => {
      expect(accounts.length).toEqual(3);
      expect(accounts.filter(t => t.bin).length).toEqual(2);
    });
    const req = httpMock.expectOne('api/accounts');
    req.flush(testAccounts);
    httpMock.verify();
  });
});

const testAccounts =
{
    "cashAccounts" :
    [{
        "id": "e31521d1-0c61-4263-a830-1d5c7c10bd0f",
        "userId": "user0",
        "accountNumber": "CASH_1254870",
        "bsbCode": "111234",
        "accountName": "Test User 0",
        "balance": 2000,
        "availableBalance": 0,
        "accountType": "CASH",
        "interestRate": 2.3
    }],
        "cardAccounts":
    [{
        "id": "c889ca24-c882-41c1-bd1a-052bf5303587",
        "userId": "jdoe",
        "bin": "412389",
        "accountNumber": "XXXXXXXXXXXX4237",
        "accountName": "Jo Doe",
        "balance": 2000,
        "availableBalance": 0,
        "accountType": "CARD",
        "interestRate": 9.5
    }, {
        "id": "fc8aa9f3-6e2d-43bb-ba76-e6e61d538798",
        "userId": "jdoe",
        "bin": "543189",
        "accountNumber": "XXXXXXXXXXXX1548",
        "accountName": "Jo Doe",
        "balance": 1200,
        "availableBalance": 0,
        "accountType": "CARD",
        "interestRate": 11.5
    }]
};