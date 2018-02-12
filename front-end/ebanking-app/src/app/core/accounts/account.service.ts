import { Injectable } from '@angular/core';
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

    private accReducer = (acc: Account[] = [], t): Account[] => {
        const account = new Account(t.id, t.userId, t.accountName, t.accountNumber, t.accountType, t.balance, t.availableBalance, t.interestRate, t.bin, t.bsbCode);
        acc.push(account);
        return acc;
    };

    private payeeReducer = (accumulator: Payee[], current): Payee[] => {
        const payee = new Payee(current.accountName, current.accountNumber, current.payeeType);
        accumulator.push(payee);
        return accumulator;
    };
}
