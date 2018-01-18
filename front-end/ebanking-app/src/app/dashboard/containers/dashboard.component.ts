import { Component, OnInit } from '@angular/core';
import { Account } from "../../core/accounts/account";
import * as fromAccounts from "../reducers";
import { Store } from '@ngrx/store';
import { RequestAccounts } from "../reducers/account.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accounts$: Observable<Account[]>;

  constructor(private store: Store<fromAccounts.State>) { }

  ngOnInit() {
    this.store.dispatch(new RequestAccounts());
    this.accounts$ = this.store.select(fromAccounts.getAccounts);
  }

}
