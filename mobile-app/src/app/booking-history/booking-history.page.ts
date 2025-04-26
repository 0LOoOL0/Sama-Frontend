import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.page.html',
  styleUrls: ['./booking-history.page.scss'],
})
export class BookingHistoryPage implements OnInit {
  bookingHistory = [
    {
      user: { name: 'Andrew Ainsley', image: 'assets/user1.jpg' },
      service: 'Bathing',
      pet: { type: 'Cat', image: 'assets/cat.jpg' },
      date: new Date(),
      time: '05:30 PM',
      price: 20.00,
    },
    {
      user: { name: 'Andrew Ainsley', image: 'assets/user1.jpg' },
      service: 'Brushing & Combing',
      pet: { type: 'Cat', image: 'assets/cat.jpg' },
      date: new Date(),
      time: '05:30 PM',
      price: 20.00,
    },
    {
      user: { name: 'Andrew Ainsley', image: 'assets/user1.jpg' },
      service: 'Haircuts & Trimming',
      pet: { type: 'Cat', image: 'assets/cat.jpg' },
      date: new Date(),
      time: '05:30 PM',
      price: 20.00,
    },
  ];

  constructor() { }

  ngOnInit() {
  }
}