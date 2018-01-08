import { Component, OnInit } from '@angular/core';
import { AccountService } from "../core/accounts/account.service";
import { Account } from "../core/accounts/account";
import * as appState from "../reducers";
import { Store } from "@ngrx/store";
import { RequestAccounts } from "./state/account.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accounts$: Observable<Account[]>;

  constructor(private accountService: AccountService, private store: Store<appState.State>) { }

  ngOnInit() {
    this.store.dispatch(new RequestAccounts());
    this.accounts$ = this.store.select('accounts').map((t: appState.AccountsState) => {
        return t.accounts;
    });
  }

}
