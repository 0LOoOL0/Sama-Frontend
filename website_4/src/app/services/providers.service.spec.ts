import { TestBed } from '@angular/core/testing';

import { ProvidersService } from './providers.service';

describe('ProvidersServicesService', () => {
  let service: ProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
