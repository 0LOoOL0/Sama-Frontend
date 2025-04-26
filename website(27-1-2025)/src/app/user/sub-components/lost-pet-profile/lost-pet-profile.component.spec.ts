import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetProfileComponent } from './lost-pet-profile.component';

describe('LostPetProfileComponent', () => {
  let component: LostPetProfileComponent;
  let fixture: ComponentFixture<LostPetProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
