import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetClinicsComponent } from './vet-clinics.component';

describe('VetClinicsComponent', () => {
  let component: VetClinicsComponent;
  let fixture: ComponentFixture<VetClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetClinicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
