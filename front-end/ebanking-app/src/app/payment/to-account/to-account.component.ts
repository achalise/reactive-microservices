import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Account} from "../../core/accounts/account";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operator/map";
import {distinctUntilChanged} from "rxjs/operator/distinctUntilChanged";
import {Payee} from "../../core/accounts/payee";
import {Subject} from "rxjs/Subject";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-to-account',
  templateUrl: './to-account.component.html',
  styleUrls: ['./to-account.component.scss']
})
export class ToAccountComponent implements OnInit {

  @Input()
  payees: Payee[] = [];

  @Output()
  onItemSelected = new EventEmitter<Payee>();

  @Input()
  placeholder: string;

  @Input()
  group: FormGroup;

  @Input()
  payee: Payee;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor() { }

  ngOnInit() {
    console.log(`Payees populated ${this.payees}`);
  }

  search = (text$: Observable<string>) => text$.merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .distinctUntilChanged()
      .map(term => term === '' ? this.payees: this.payees.filter(v => v.displayName().toLowerCase().indexOf(term.toLowerCase()) > -1));

  formatter = (x: {displayName: () => string}) => x.displayName ? x.displayName() : "";

  itemSelected = (event) => {
    if (event instanceof Payee) {
      this.onItemSelected.emit(event);
    }
  }

}
