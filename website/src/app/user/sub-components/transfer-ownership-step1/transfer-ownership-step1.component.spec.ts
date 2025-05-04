import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOwnershipStep1Component } from './transfer-ownership-step1.component';

describe('TransferOwnershipStep1Component', () => {
  let component: TransferOwnershipStep1Component;
  let fixture: ComponentFixture<TransferOwnershipStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferOwnershipStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferOwnershipStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
