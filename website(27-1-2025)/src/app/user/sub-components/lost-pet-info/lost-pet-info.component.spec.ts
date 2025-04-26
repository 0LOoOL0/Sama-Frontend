import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetInfoComponent } from './lost-pet-info.component';

describe('LostPetInfoComponent', () => {
  let component: LostPetInfoComponent;
  let fixture: ComponentFixture<LostPetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
