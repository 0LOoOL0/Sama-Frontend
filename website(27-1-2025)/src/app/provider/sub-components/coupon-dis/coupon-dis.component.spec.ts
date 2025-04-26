import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDisComponent } from './coupon-dis.component';

describe('CouponDisComponent', () => {
  let component: CouponDisComponent;
  let fixture: ComponentFixture<CouponDisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponDisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
