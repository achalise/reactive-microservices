import { Component, OnInit } from '@angular/core';
import {AccountService} from "../core/accounts/account.service";
import {Account} from "../core/accounts/account";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accounts: Account[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getFromAccounts().subscribe(list => {
      this.accounts = list;
    });
  }

}
