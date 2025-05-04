import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOtpComponent } from './provider-otp.component';

describe('ProviderOtpComponent', () => {
  let component: ProviderOtpComponent;
  let fixture: ComponentFixture<ProviderOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
