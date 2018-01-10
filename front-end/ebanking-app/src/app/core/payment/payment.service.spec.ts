import { TestBed, inject } from '@angular/core/testing';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentService]
    });
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
