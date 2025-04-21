import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAddDoctorComponent } from './provider-add-doctor.component';

describe('ProviderAddDoctorComponent', () => {
  let component: ProviderAddDoctorComponent;
  let fixture: ComponentFixture<ProviderAddDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderAddDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderAddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
