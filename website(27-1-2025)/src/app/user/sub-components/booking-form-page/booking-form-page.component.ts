import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../../../services/user-auth.service'; // adjust if needed

@Component({
  selector: 'app-booking-form-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form-page.component.html',
  styleUrls: ['./booking-form-page.component.css']
})
export class BookingFormPageComponent implements OnInit {
  currentMonthYear!: string;
  calendarDays: number[][] = [];
  currentDate: Date = new Date();
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  bookingForm!: FormGroup;
  petOwnerId: number | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: UserAuthService // ✅ Inject the auth service
  ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.bookingForm = this.fb.group({
      booking_for: ['', Validators.required],
      booking_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      remind: [false],
      note: ['']
    });

    // ✅ Get logged-in user ID
    this.authService.getAuthenticatedPetOwnerId()
      .then(id => this.petOwnerId = id)
      .catch(err => console.error('Could not get user ID:', err));
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

  showAlert(): void {
    const modal = document.getElementById('customAlert');
    if (modal) modal.style.display = 'flex';
  }

  confirmAlert(): void {
    const initialModal = document.getElementById('customAlert');
    const confirmModal = document.getElementById('confirmAlert');
    if (initialModal) initialModal.style.display = 'none';
    if (confirmModal) confirmModal.style.display = 'flex';

    const formValue = this.bookingForm.getRawValue();

    if (!this.petOwnerId) {
      console.error('pet_owner_id not available');
      return;
    }

    const bookingData = {
      pet_owner_id: this.petOwnerId, // ✅ dynamic ID
      booking_date: formValue.booking_date,
      start_time: formValue.start_time,
      end_time: formValue.end_time,
      remind: formValue.remind ? 1 : 0,
      note: formValue.note
    };

    this.http.post('http://127.0.0.1:8000/api/bookings', bookingData).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['user-main-component/my-orders']);
        }, 2000);
      },
      error: (err) => {
        console.error('Booking failed:', err);
      }
    });
  }

  closeAlert(): void {
    const modal = document.getElementById('confirmAlert');
    if (modal) modal.style.display = 'none';
  }
}
