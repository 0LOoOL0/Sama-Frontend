import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderformComponent } from './reminderform.component';

describe('ReminderformComponent', () => {
  let component: ReminderformComponent;
  let fixture: ComponentFixture<ReminderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
