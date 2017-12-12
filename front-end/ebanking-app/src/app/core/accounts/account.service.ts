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
    return this.http.get<IAccountListResponse>('api/accounts').map(d => d.accountList);
  }
}
