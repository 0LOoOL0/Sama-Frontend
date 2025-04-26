import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-new-my-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-my-appointments.component.html',
  styleUrls: ['./new-my-appointments.component.css']
})
export class NewMyAppointmentsComponent implements OnInit {
  reminders: any[] = [];
  currentDate: Date = new Date();
  currentMonthYear!: string;
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendarDays: number[][] = [];
  isPopupVisible = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.generateCalendar();

    this.bookingService.getMyBookings().subscribe({
      next: (data: any[]) => {
        console.log('Bookings from API:', data);
        this.reminders = data.map((booking: any) => ({
          provider: booking.provider?.type ?? 'Unknown',
          title: booking.service?.title ?? 'No Title',
          date: booking.booking_date,
          doctor: booking.provider?.provider_name_en ?? 'No Doctor Name'
        }));
        console.log('Reminders parsed:', this.reminders);
      },
      error: (err: any) => {
        console.error('Failed to load bookings:', err);
      }
    });
  }

  generateCalendar() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    this.currentMonthYear = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(this.currentDate);
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

  addReminder() {}
  editReminder() {}
  openPopup() { this.isPopupVisible = true; }
  closePopup() { this.isPopupVisible = false; }
}
