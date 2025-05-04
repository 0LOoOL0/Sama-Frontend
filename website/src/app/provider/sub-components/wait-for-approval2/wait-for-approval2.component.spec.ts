import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForApproval2Component } from './wait-for-approval2.component';

describe('WaitForApproval2Component', () => {
  let component: WaitForApproval2Component;
  let fixture: ComponentFixture<WaitForApproval2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitForApproval2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitForApproval2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
