import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesListingComponent } from './packages-listing.component';

describe('PackagesListingComponent', () => {
  let component: PackagesListingComponent;
  let fixture: ComponentFixture<PackagesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
