import { TestBed, inject } from '@angular/core/testing';

import { CommonInterceptor } from './common.interceptor';

describe('Common.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonInterceptor]
    });
  });

  it('should be created', inject([CommonInterceptor], (service: CommonInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
