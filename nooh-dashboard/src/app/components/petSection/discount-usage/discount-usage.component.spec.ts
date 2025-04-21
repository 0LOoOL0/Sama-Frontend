import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountUsageComponent } from './discount-usage.component';

describe('DiscountUsageComponent', () => {
  let component: DiscountUsageComponent;
  let fixture: ComponentFixture<DiscountUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
