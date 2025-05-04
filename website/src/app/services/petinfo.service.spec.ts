import { TestBed } from '@angular/core/testing';

import { PetinfoService } from './petinfo.service';

describe('PetinfoService', () => {
  let service: PetinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
