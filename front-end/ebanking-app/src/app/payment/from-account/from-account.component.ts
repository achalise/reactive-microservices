import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Account} from "../../core/accounts/account";
import {Observable} from "rxjs";
import { distinctUntilChanged } from "rxjs/operator/distinctUntilChanged";
import { map } from "rxjs/operator/map";

@Component({
  selector: 'app-from-account',
  templateUrl: './from-account.component.html',
  styleUrls: ['./from-account.component.scss']
})
export class FromAccountComponent implements OnInit {

  constructor() { }

  @Input()
  group: FormGroup;

  @Input()
  accounts: Account[];

  @Input()
  placeholder: string;

  @Output()
  onItemSelected = new EventEmitter<Account>();


  ngOnInit() {
    //console.log(`The accounts: ${this.accounts.map(a => a.accountName)}`);
  }

  search = (text$: Observable<string>) =>  map.call(
      (distinctUntilChanged.call(text$)), term => term.length < 1 ? this.accounts : this.accounts.filter(v => v.accountName.toLowerCase().indexOf(term.toLowerCase()) > -1));

  formatter = (x: {displayName: () => string}) => x.displayName ? x.displayName() : "";

  itemSelected = (event) => {
    if (event instanceof Account) {
      this.onItemSelected.emit(event);
    }
  }

}
