import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
    ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Account} from "../../core/accounts/account";
import {Observable} from "rxjs";
import { distinctUntilChanged } from "rxjs/operator/distinctUntilChanged";
import { map } from "rxjs/operator/map";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-from-account',
  templateUrl: './from-account.component.html',
  styleUrls: ['./from-account.component.scss']
})
export class FromAccountComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Values changed');
    console.log(changes);
  }

  constructor() { }

  @Input()
  group: FormGroup;

  @Input()
  accounts: Account[];

  @Input()
  placeholder: string;


  @Input()
  fromAccount: Account;


  @Output()
  onItemSelected = new EventEmitter<Account>();

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {
    //console.log(`The accounts: ${this.accounts.map(a => a.accountName)}`);
  }


  searchTwo = (text$: Observable<string>) => text$.debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => term === '' ? this.accounts: this.accounts.filter(v => v.displayName().toLowerCase().indexOf(term.toLowerCase()) > -1));

  search = (text$: Observable<string>) =>  map.call(
      (distinctUntilChanged.call(text$)), term => term.length < 1 ? this.accounts : this.accounts.filter(v => v.accountName.toLowerCase().indexOf(term.toLowerCase()) > -1));

  formatter = (x: {displayName: () => string}) => x.displayName ? x.displayName() : "";

  itemSelected = (event) => {
    if (event instanceof Account) {
      this.onItemSelected.emit(event);
    }
  }

}
