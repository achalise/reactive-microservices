import { Injectable } from '@angular/core';
import { Account } from "./account";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  private fromAccounts: Account[];

  constructor(private http: HttpClient) {
    this.fromAccounts = [ new Account('1', 'Joe Blog', 'C123123', 'MORTGAGE', 1000),
      new Account('2', 'Joe Blog', 'D111188', 'CASH', 30000),
      new Account('3', 'Joe Blog', 'E32123', 'CREDIT_CARD', 6000) ];
  }

  getFromAccounts(): Account[] {
    this.http.get('api/items').subscribe(data => {
      console.log(`The data ${data}`);
    }, e => {
      console.log(e);
    })
    return this.fromAccounts;
  }

}
