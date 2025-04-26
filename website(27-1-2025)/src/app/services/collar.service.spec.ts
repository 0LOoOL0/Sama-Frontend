import { TestBed } from '@angular/core/testing';

import { CollarService } from './collar.service';

describe('CollarService', () => {
  let service: CollarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
