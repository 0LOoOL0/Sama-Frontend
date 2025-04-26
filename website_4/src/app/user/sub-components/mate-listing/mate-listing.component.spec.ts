import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateListingComponent } from './mate-listing.component';

describe('MateListingComponent', () => {
  let component: MateListingComponent;
  let fixture: ComponentFixture<MateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
