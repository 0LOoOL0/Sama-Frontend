import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPolicyDetailsComponent } from './pet-policy-details.component';

describe('PetPolicyDetailsComponent', () => {
  let component: PetPolicyDetailsComponent;
  let fixture: ComponentFixture<PetPolicyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetPolicyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetPolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
