import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookappointmentPage } from './bookappointment.page';

describe('BookappointmentPage', () => {
  let component: BookappointmentPage;
  let fixture: ComponentFixture<BookappointmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookappointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
