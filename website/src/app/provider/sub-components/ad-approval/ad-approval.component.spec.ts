import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdApprovalComponent } from './ad-approval.component';

describe('AdApprovalComponent', () => {
  let component: AdApprovalComponent;
  let fixture: ComponentFixture<AdApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
