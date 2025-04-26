import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscounthistoryPage } from './discounthistory.page';

describe('DiscounthistoryPage', () => {
  let component: DiscounthistoryPage;
  let fixture: ComponentFixture<DiscounthistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscounthistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
