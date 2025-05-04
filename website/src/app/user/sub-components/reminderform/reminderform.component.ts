import { Component } from '@angular/core';
import { FormBuilder, FormGroup  , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-reminderform',
  standalone: true,
  imports: [CommonModule  , ReactiveFormsModule, NavbarComponent],
  templateUrl: './reminderform.component.html',
  styleUrl: './reminderform.component.css'
})
export class ReminderformComponent {
  currentMonthYear!: string;
  calendarDays: number[][] = [];
  currentDate: Date = new Date();
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  reminderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.reminderForm = this.fb.group({
      title: [''],
      tags: [''],
      date: [''],
      startTime: [''],
      endTime: [''],
      remind: [false],
      repeat: ['Doesn\'t repeat'],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    this.currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(this.currentDate);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    let week: number[] = [];
    this.calendarDays = [];

    for (let i = 0; i < adjustedFirstDay; i++) {
      week.push(0);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        this.calendarDays.push(week);
        week = [];
      }
      week.push(day);
    }

    while (week.length < 7) {
      week.push(0);
    }
    this.calendarDays.push(week);
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  // Submit the reminder form
  onSubmit() {
    console.log(this.reminderForm.value);
  }
}