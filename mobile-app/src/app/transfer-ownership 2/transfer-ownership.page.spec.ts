import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferOwnershipPage } from './transfer-ownership.page';

describe('TransferOwnershipPage', () => {
  let component: TransferOwnershipPage;
  let fixture: ComponentFixture<TransferOwnershipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOwnershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
