import { TestBed } from '@angular/core/testing';

import { ProviderSectionService } from './provider-section.service';

describe('ProviderSectionService', () => {
  let service: ProviderSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
