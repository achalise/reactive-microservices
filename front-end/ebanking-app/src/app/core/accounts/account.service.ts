import { Injectable } from '@angular/core';
import { Account } from "./account";
import {HttpClient} from "@angular/common/http";
import {IAccountListResponse} from "./account.response";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getFromAccounts(): Observable<Account[]> {
    const rootUrl = `http://192.168.99.100:31472/all`
    return this.http.get<IAccountListResponse>('api')
        .map(d => d.cardAccounts.concat(d.cashAccounts))
        .map(d => this.transForm(d));
  }

  private transForm(d: any) {
    let accounts: Account[] = [];
    d.forEach(t => {
      let account = new Account(t.id, t.userId, t.accountName, t.accountNumber, t.accountType, t.balance, t.availableBalance, t.interestRate, t.bin, t.bsbCode);
      accounts.push(account);
    });
    return accounts;
  }
}
