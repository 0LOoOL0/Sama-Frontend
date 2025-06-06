import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetInfoComponent } from './new-pet-info.component';

describe('NewPetInfoComponent', () => {
  let component: NewPetInfoComponent;
  let fixture: ComponentFixture<NewPetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPetInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
