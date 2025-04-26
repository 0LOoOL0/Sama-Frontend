import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitApprovalComponent } from './wait-approval.component';

describe('WaitApprovalComponent', () => {
  let component: WaitApprovalComponent;
  let fixture: ComponentFixture<WaitApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
