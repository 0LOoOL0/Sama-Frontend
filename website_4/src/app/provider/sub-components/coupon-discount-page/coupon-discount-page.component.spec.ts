import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDiscountPageComponent } from './coupon-discount-page.component';

describe('CouponDiscountPageComponent', () => {
  let component: CouponDiscountPageComponent;
  let fixture: ComponentFixture<CouponDiscountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponDiscountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDiscountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
