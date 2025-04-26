import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderReportComponent } from './provider-report.component';

describe('ProviderReportComponent', () => {
  let component: ProviderReportComponent;
  let fixture: ComponentFixture<ProviderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
