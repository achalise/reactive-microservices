import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from '@app/core/accounts/account';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'eb-from-account',
    templateUrl: './from-account.component.html',
    styleUrls: [ './from-account.component.scss' ]
})
export class FromAccountComponent implements OnChanges {

    @Input() group: FormGroup;
    @Input() accounts: Account[];
    @Input() placeholder: string;
    @Input() fromAccount: Account;
    @Output() ItemSelected = new EventEmitter<Account>();
    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Values changed');
        console.log(changes);
    }

    search = (text$: Observable<string>) => text$.debounceTime(200).distinctUntilChanged()
        .merge(this.focus$)
        .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
        .map(term => term === '' ? this.accounts : this.accounts.filter(v => v.displayName().toLowerCase().indexOf(term.toLowerCase()) > -1))

    formatter = (x: { displayName: () => string }) => x.displayName ? x.displayName() : '';

    itemSelected = (event) => {
        if (event instanceof Account) {
            this.ItemSelected.emit(event);
        }
    }

}
