import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOwnershipStep2Component } from './transfer-ownership-step2.component';

describe('TransferOwnershipStep2Component', () => {
  let component: TransferOwnershipStep2Component;
  let fixture: ComponentFixture<TransferOwnershipStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferOwnershipStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferOwnershipStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
