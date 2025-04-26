import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHealthConcernComponent } from './pet-health-concern.component';

describe('PetHealthConcernComponent', () => {
  let component: PetHealthConcernComponent;
  let fixture: ComponentFixture<PetHealthConcernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetHealthConcernComponent]
    });
    fixture = TestBed.createComponent(PetHealthConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
