import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetClinicServiceComponent } from './vet-clinic-service.component';

describe('VetClinicServiceComponent', () => {
  let component: VetClinicServiceComponent;
  let fixture: ComponentFixture<VetClinicServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetClinicServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetClinicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
