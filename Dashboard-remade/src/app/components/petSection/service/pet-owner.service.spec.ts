import { TestBed } from '@angular/core/testing';

import { PetOwnerService } from './pet-owner.service';

describe('PetOwnerService', () => {
  let service: PetOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
