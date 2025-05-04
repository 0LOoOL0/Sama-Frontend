import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOwnershipStep3Component } from './transfer-ownership-step3.component';

describe('TransferOwnershipStep3Component', () => {
  let component: TransferOwnershipStep3Component;
  let fixture: ComponentFixture<TransferOwnershipStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferOwnershipStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferOwnershipStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
