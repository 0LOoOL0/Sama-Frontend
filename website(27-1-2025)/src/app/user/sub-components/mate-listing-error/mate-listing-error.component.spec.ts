import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateListingErrorComponent } from './mate-listing-error.component';

describe('MateListingErrorComponent', () => {
  let component: MateListingErrorComponent;
  let fixture: ComponentFixture<MateListingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateListingErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateListingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
