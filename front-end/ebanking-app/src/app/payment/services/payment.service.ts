import { Injectable } from '@angular/core';
import { PaymentRequestModel } from '@app/payment/models/payment-request.model';
import { PaymentRequest } from '@app/payment/store';
import { Observable } from 'rxjs/Observable';
import { IPaymentResponse } from './payment.response';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

    constructor(private http: HttpClient) {
    }

    submitPayment(paymentRequest: PaymentRequestModel): Observable<IPaymentResponse> {
        return this.http.post<IPaymentResponse>('api/payment', paymentRequest);
    }

}
