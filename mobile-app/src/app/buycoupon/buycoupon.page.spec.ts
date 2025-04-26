import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuycouponPage } from './buycoupon.page';

describe('BuycouponPage', () => {
  let component: BuycouponPage;
  let fixture: ComponentFixture<BuycouponPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuycouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
