import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '@app/core/accounts/account';
import { AccountService } from '@app/core/accounts/account.service';
import { Payee } from '@app/core/accounts/payee';
import * as fromAccounts from '@app/dashboard/store';
import { PaymentStatus } from '@app/payment/models';
import * as fromPayment from '@app/payment/store';
import * as fromPaymentActions from '@app/payment/store';
import * as appState from '@app/store/reducers/index';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'eb-payment',
    templateUrl: './payment.component.html',
    styleUrls: [ './payment.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit, OnChanges, OnDestroy {

    protected paymentForm: FormGroup;

    protected paymentRequest$: Observable<fromPayment.PaymentRequest>;

    protected fromAccounts$: Observable<Account[]>;
    protected fromAccount$: Observable<Account>;

    protected toAccounts$: Observable<Payee[]>;
    protected toAccount$: Observable<Payee>;
    protected startDate$: Observable<NgbDateStruct>;
    protected amount$: Observable<number>;
    protected notes$: Observable<string>;

    protected notes: string;


    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private accountService: AccountService,
                private fb: FormBuilder,
                private store: Store<appState.State>,
                private router: Router) {

    }

    ngOnInit() {
        this.paymentRequest$ = this.store.select(fromPayment.getPaymentRequest).filter(t => !!t);

        this.fromAccounts$ = this.store.select(fromAccounts.getAccounts);
        this.fromAccount$ = map.call(filter.call(this.paymentRequest$, t => !!t), t => t.fromAccount);
        this.toAccounts$ = this.store.select(fromPayment.getPayees);
        this.toAccounts$.subscribe(
            d => console.log('the payees' + d),
            e => console.log('The error', e)
        );

        this.toAccount$ = this.paymentRequest$.map(t => t.toAccount);

        this.startDate$ = this.paymentRequest$.map(t => t.paymentDate);
        this.amount$ = this.paymentRequest$.map(t => t.amount);
        this.notes$ = this.paymentRequest$.map(t => t.notes);

        this.paymentRequest$.takeUntil(this.unsubscribe).subscribe(p => {
            this.notes = p.notes;
        });
        this.createForm();

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngOnChanges(): void {
        console.log(`new value ${this.paymentForm}`);
    }

    resetPaymentRequest() {
        this.store.dispatch(new fromPaymentActions.InitPaymentRequest());
    }

    submit() {
        console.log(`Form submitted`);
        this.store.dispatch(new fromPaymentActions.UpdatePaymentStatus(PaymentStatus.CONFIRMED));
        this.router.navigate([ 'confirm-payment' ]).catch(err => console.log(err));
    }

    accountSelected(event: Account) {
        console.log(`The form: `, this.paymentForm);
        console.log(`Account selected was `, event.accountName);
        this.store.dispatch(new fromPaymentActions.UpdateFromAccount(event));
    }

    payeeSelected(payee: Payee) {
        console.log(`Payee selected was`, payee);
        this.store.dispatch(new fromPaymentActions.UpdateToAccount(payee));
    }

    startDateUpdated(date: NgbDateStruct) {
        this.store.dispatch(new fromPaymentActions.UpdatePaymentDate(date));
    }

    amountChanged(amount: string) {
        if (amount) {
            const amountValue = Number(amount);
            if (amountValue && !isNaN(amountValue)) {
                this.store.dispatch(new fromPaymentActions.UpdatePaymentAmount(Number(amount)));
            }
        }
    }

    notesChanged(notes: string) {
        this.store.dispatch(new fromPaymentActions.UpdatePaymentNotes(notes));
    }

    private createForm() {
        this.paymentForm = this.fb.group({
            fromAccount: [ null, Validators.required ],
            toAccount: [ null, Validators.required ],
            startDate: [ null, Validators.required ],
            amount: [ '', { validators: Validators.required, updateOn: 'blur' } ],
            notes: [ '', { updateOn: 'blur' } ],
        });
    }

}
