import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-my-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-my-appointments.component.html',
  styleUrl: './new-my-appointments.component.css'
})
export class NewMyAppointmentsComponent {

  constructor(
      private router: Router,
    ) {}

  currentMonthYear!: string;
  calendarDays: number[][] = [];
  currentDate: Date = new Date();
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Mock reminders data
  reminders = [
    { provider: 'Pets clinic', title: 'Maxi Vaccination', date: '13/04/2022', doctor: 'Dr. Martha Roth' },
    { provider: 'Pets clinic', title: 'Checkup', date: '23/03/2022', doctor: 'Dr. Martha Roth' },
    { provider: 'Pets clinic', title: 'Rabisin', date: '23/03/2022', doctor: 'Dr. Martha Roth' }
  ];

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

  addReminder() {
    this.router.navigate(['../user-main-component/reminder-form']);
  }

  editReminder() {
    this.router.navigate(['../user-main-component/reminder-form']);
  }

  isPopupVisible: boolean = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

}
