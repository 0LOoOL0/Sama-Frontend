import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetComponent } from './lost-pet.component';

describe('LostPetComponent', () => {
  let component: LostPetComponent;
  let fixture: ComponentFixture<LostPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
