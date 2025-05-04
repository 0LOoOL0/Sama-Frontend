import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingServicePageComponent } from './booking-service-page.component';

describe('BookingServicePageComponent', () => {
  let component: BookingServicePageComponent;
  let fixture: ComponentFixture<BookingServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingServicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
