import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-booking-form-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './booking-form-page.component.html',
  styleUrls: ['./booking-form-page.component.css']
})
export class BookingFormPageComponent implements OnInit {

  date: string = '';
  time: string = '12:00am';
  remind: boolean = false;
  repeatOptions: string[] = ["Doesn't repeat", 'Daily', 'Weekly', 'Monthly'];
  selectedRepeat: string = "Doesn't repeat";
  note: string = '';

  constructor() {}

  ngOnInit(): void {}

  bookAppointment(): void {
    console.log('Booking Details:', {
      date: this.date,
      time: this.time,
      remind: this.remind,
      repeat: this.selectedRepeat,
      note: this.note
    });
  }
}
