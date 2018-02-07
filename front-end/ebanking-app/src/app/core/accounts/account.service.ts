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
        const rootUrl = `http://192.168.99.100:31472/all`;
        return this.http.get<IAccountListResponse>('api/accounts')
            .map(d => d.cardAccounts.concat(d.cashAccounts))
            .map(this.transForm);
    }

    getPayees(): Observable<Payee[]> {
        const ret = this.http.get<Payee[]>('api/payees').map(this.transformToPayee);
        return ret;
    }

    private transformToPayee(d: any) {
        const payees: Payee[] = [];
        d.forEach(t => {
            const payee = new Payee(t.accountName, t.accountNumber, t.payeeType);
            payees.push(payee);
        });
        return payees;
    }

    private transForm(d: any) {
        const accounts: Account[] = [];
        d.forEach(t => {
            const account = new Account(t.id, t.userId, t.accountName, t.accountNumber, t.accountType, t.balance, t.availableBalance, t.interestRate, t.bin, t.bsbCode);
            accounts.push(account);
        });
        return accounts;
    }
}
