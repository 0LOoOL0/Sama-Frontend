import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForApprovalComponent } from './wait-for-approval.component';

describe('WaitForApprovalComponent', () => {
  let component: WaitForApprovalComponent;
  let fixture: ComponentFixture<WaitForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitForApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
