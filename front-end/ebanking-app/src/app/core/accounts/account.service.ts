import { Injectable } from '@angular/core';
import { Transaction } from '@app/core/accounts/transaction';
import { of } from 'rxjs/observable/of';
import { map, withLatestFrom } from 'rxjs/operators';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { IAccountListResponse } from './account.response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Payee } from './payee';


@Injectable()
export class AccountService {

    constructor(private http: HttpClient) {
    }

    getFromAccounts(): Observable<Account[]> {
        // const rootUrl = `http://192.168.99.100:31472/all`;
        const rootUrl = `http://localhost:8083/`;
        return this.http.get<IAccountListResponse>('api/accounts')
            .map(d => d.cardAccounts.concat(d.cashAccounts))
            .map(d => d.reduce(this.accReducer, []));
    }

    getPayees(): Observable<Payee[]> {
        const ret = this.http.get<Payee[]>('api/payees').map(resp => resp.reduce(this.payeeReducer, []));
        return ret;
    }

    getPayees2(): Observable<Payee[]> {
        const biller = new Payee('c889ca24-c882-41c1-bd1a-052bf5303587', 'AGL Energy', null,
            'BILLER', null, '321346', '11145321788', 'Electricity Bill');
        return this.getFromAccounts().pipe(
            withLatestFrom(of([biller])),
            map(([a, b]) => {
                return a.map(acc => new Payee(acc.id, acc.accountName, acc.accountNumber,
                    'SELF', null,
                    null, null)).concat(b);
            })
        );
    }

    getTransactions(account: Account): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`api/account/${account.accountType.toLowerCase()}/${account.id}/transactions`).map(resp => resp.reduce(this.transactionReducer, []));
    }

    private accReducer = (acc: Account[] = [], t): Account[] => {
        const account = new Account(t.id, t.userId, t.accountName, t.accountNumber, t.accountType, t.balance, t.availableBalance, t.interestRate, t.bin, t.bsbCode);
        acc.push(account);
        return acc;
    };

    private payeeReducer = (accumulator: Payee[], current): Payee[] => {
        const payee = new Payee(current.id, current.accountName, current.accountNumber, current.payeeType);
        accumulator.push(payee);
        return accumulator;
    };

    private transactionReducer = (accumulator: Transaction[], current): Transaction[] => {
        const tx = new Transaction(current.transactionId, current.accountNumber, current.toAccount,
            current.amount, current.description, current.transactionType, current.balance);
        accumulator.push(tx);
        return accumulator;
    };
}
