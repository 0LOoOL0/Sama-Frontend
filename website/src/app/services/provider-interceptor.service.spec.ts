import { TestBed } from '@angular/core/testing';

import { ProviderInterceptorService } from './provider-interceptor.service';

describe('ProviderInterceptorService', () => {
  let service: ProviderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
