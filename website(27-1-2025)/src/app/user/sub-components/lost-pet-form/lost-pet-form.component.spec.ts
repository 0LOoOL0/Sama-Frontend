import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetFormComponent } from './lost-pet-form.component';

describe('LostPetFormComponent', () => {
  let component: LostPetFormComponent;
  let fixture: ComponentFixture<LostPetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
