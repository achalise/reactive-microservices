import { PaymentStatus } from '@app/payment/models/payment-status';
import { paymentRequestReducer } from '@app/payment/store/reducers/payment.request.reducer';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'app/core/accounts/account';
import { Payee } from 'app/core/accounts/payee';
import { payeesReducer } from './payees.reducer';

export interface PaymentRequest {
    fromAccount: Account;
    toAccount: Payee;
    amount: number;
    paymentDate: NgbDateStruct;
    notes: string;
    status: PaymentStatus;
}

export interface PayeesState {
    payees: Payee[];
    payeesLoading: boolean;
}

export interface PaymentState {
    payees: PayeesState;
    paymentRequest: PaymentRequest;
}

export const reducers = {
    payees: payeesReducer,
    paymentRequest: paymentRequestReducer
};
