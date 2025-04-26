import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductlistPage } from './productlist.page';

describe('ProductlistPage', () => {
  let component: ProductlistPage;
  let fixture: ComponentFixture<ProductlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
