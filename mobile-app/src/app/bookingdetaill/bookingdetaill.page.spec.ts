import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingdetaillPage } from './bookingdetaill.page';

describe('BookingdetaillPage', () => {
  let component: BookingdetaillPage;
  let fixture: ComponentFixture<BookingdetaillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingdetaillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
