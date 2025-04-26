import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCardPage } from './qr-card.page';

describe('QRCardPage', () => {
  let component: QRCardPage;
  let fixture: ComponentFixture<QRCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QRCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
