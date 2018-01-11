import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
