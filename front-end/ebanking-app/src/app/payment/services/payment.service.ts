import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IPaymentResponse } from './payment.response';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

    constructor(private http: HttpClient) {
    }

    submitPayment(): Observable<IPaymentResponse> {
        return this.http.get<IPaymentResponse>('api/pay');
    }

}
