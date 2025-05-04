import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyAppointmentsComponent } from './new-my-appointments.component';

describe('NewMyAppointmentsComponent', () => {
  let component: NewMyAppointmentsComponent;
  let fixture: ComponentFixture<NewMyAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMyAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMyAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
