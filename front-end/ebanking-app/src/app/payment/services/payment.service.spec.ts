import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ PaymentService ],
            imports: [ HttpClientTestingModule ]
        });
    });

    it('should be created', inject([ PaymentService ], (service: PaymentService) => {
        expect(service).toBeTruthy();
    }));
});
