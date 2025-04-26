import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { ReminderService } from '../../../services/reminder.service';

@Component({
  selector: 'app-reminderlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './reminderlist.component.html',
  styleUrl: './reminderlist.component.css'
})
export class ReminderlistComponent implements OnInit {
  currentMonthYear!: string;
  calendarDays: number[][] = [];
  currentDate: Date = new Date();
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  reminders: any[] = [];

  constructor(
    private router: Router,
    private reminderService: ReminderService
  ) {}

  ngOnInit(): void {
    this.generateCalendar();

    this.reminderService.getMyReminders()
      .then((data: any[]) => {
        this.reminders = data;
      })
      .catch((err: any) => {
        console.error('Failed to load reminders:', err);
      });
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

    for (let i = 0; i < adjustedFirstDay; i++) week.push(0);

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        this.calendarDays.push(week);
        week = [];
      }
      week.push(day);
    }

    while (week.length < 7) week.push(0);
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
    this.router.navigate(['user-main-component/reminder-form']);
  }

  editReminder(id: number) {
    this.router.navigate(['user-main-component/reminder-form'], {
      queryParams: { id }
    });
  }


  deleteReminder(id: number) {
    if (!confirm('Are you sure you want to delete this reminder?')) return;
  
    this.reminderService.deleteReminder(id)
      .then(() => {
        // Remove from list after deletion
        this.reminders = this.reminders.filter(r => r.id !== id);
        console.log('Reminder deleted successfully');
      })
      .catch(err => {
        console.error('Failed to delete reminder:', err);
      });
  }
  
  
  
}
