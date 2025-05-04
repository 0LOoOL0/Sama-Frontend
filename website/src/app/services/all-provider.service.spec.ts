import { TestBed } from '@angular/core/testing';

import { AllProviderService } from './all-provider.service';

describe('AllProviderService', () => {
  let service: AllProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
