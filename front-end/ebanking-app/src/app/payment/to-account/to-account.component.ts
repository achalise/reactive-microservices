import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Account} from "../../core/accounts/account";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operator/map";
import {distinctUntilChanged} from "rxjs/operator/distinctUntilChanged";

@Component({
  selector: 'app-to-account',
  templateUrl: './to-account.component.html',
  styleUrls: ['./to-account.component.scss']
})
export class ToAccountComponent implements OnInit {

  @Input()
  accounts: Account[] = [];

  @Output()
  onItemSelected = new EventEmitter<Account>();

  @Input()
  placeholder: string;

  @Input()
  group: FormGroup;

  model: any;
  previousValue: any;

  constructor() { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>  map.call(
      (distinctUntilChanged.call(text$)), term => term.length < 1 ? this.accounts : this.accounts.filter(v => v.displayName().toLowerCase().indexOf(term.toLowerCase()) > -1));

  formatter = (x: {displayName: () => string}) => x.displayName ? x.displayName() : "";

  itemSelected = (event) => {
    if (event instanceof Account) {
      this.onItemSelected.emit(event);
      this.previousValue = event;
    }
  }

}
