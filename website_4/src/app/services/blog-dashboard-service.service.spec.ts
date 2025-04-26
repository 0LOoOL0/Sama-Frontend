import { TestBed } from '@angular/core/testing';

import { BlogDashboardServiceService } from './blog-dashboard-service.service';

describe('BlogDashboardServiceService', () => {
  let service: BlogDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
