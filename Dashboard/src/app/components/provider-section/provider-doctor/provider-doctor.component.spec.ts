import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDoctorComponent } from './provider-doctor.component';

describe('ProviderDoctorComponent', () => {
  let component: ProviderDoctorComponent;
  let fixture: ComponentFixture<ProviderDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
