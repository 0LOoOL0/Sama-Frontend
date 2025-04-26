import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetHealthConcernComponent } from './edit-pet-health-concern.component';

describe('EditPetHealthConcernComponent', () => {
  let component: EditPetHealthConcernComponent;
  let fixture: ComponentFixture<EditPetHealthConcernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPetHealthConcernComponent]
    });
    fixture = TestBed.createComponent(EditPetHealthConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
