import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadAccountTransactionsAction } from '@app/accounts/store/actions/accounts.actions';
import { getTransactionsForAccount } from '@app/accounts/store/selectors/accounts.selectors';
import { Account } from '@app/core/accounts/account';
import { Transaction } from '@app/core/accounts/transaction';
import { State } from '@app/store';
import { getSelectedAccount } from '@app/store/selectors/root-app.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-account-details',
    templateUrl: './account-details.component.html',
    styleUrls: [ './account-details.component.scss' ]
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
    public accountDetailForm: FormGroup;
    account$: Observable<Account>;
    transactions$: Observable<Transaction[]>;
    transactions: Transaction[];
    account: Account;

    live$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<State>, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.accountDetailForm = this.fb.group({
            accountName: [ '', [ Validators.required, Validators.minLength(6), Validators.maxLength(6) ] ]
        });

        this.accountDetailForm.get('accountName').valueChanges.subscribe(value => console.log(value));

        this.account$ = this.store.select(getSelectedAccount);
        this.account$.pipe(
            takeUntil(this.live$),
            tap((acct) => {
                this.account = acct;
                this.store.dispatch(new LoadAccountTransactionsAction(acct));
            })
        ).subscribe((acct) => {
            this.account = acct;
            this.transactions$ = this.store.select(getTransactionsForAccount(acct.id));
            // this.transactions$.subscribe(t => {
            //     console.log(`The transactions `, t);
            // }, err => {
            //     console.log(`The error ` + err);
            // });
        }, error => {
            console.log(`Error when retrieving selected account `, error);
        });



    }

    ngOnDestroy() {
        this.live$.next(false);
        this.live$.complete();
    }
}
