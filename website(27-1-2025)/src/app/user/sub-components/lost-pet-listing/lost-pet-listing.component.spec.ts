import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetListingComponent } from './lost-pet-listing.component';

describe('LostPetListingComponent', () => {
  let component: LostPetListingComponent;
  let fixture: ComponentFixture<LostPetListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
