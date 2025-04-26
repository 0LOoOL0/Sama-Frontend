import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitApprovalPage } from './wait-approval.page';

describe('WaitApprovalPage', () => {
  let component: WaitApprovalPage;
  let fixture: ComponentFixture<WaitApprovalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
