import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPageComponent } from './coupon-page.component';

describe('CouponPageComponent', () => {
  let component: CouponPageComponent;
  let fixture: ComponentFixture<CouponPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
