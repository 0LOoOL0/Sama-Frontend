import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.page.html',
  styleUrls: ['./bookview.page.scss'],
})
export class BookviewPage implements OnInit {

  bookings = [
    { 
      trainer: 'Trainer', 
      service: 'Pet Obedience Training', 
      date: 'Monday 15 Sep', 
      time: '05:30 PM', 
      fee: 'BHD20.00', 
      petType: 'Cat', 
      trainerImage: 'assets/trainer.jpg', 
      petImage: 'assets/cat.jpg' 
    },
    { 
      trainer: 'Dr. Doctor', 
      service: 'Checkup', 
      date: 'Tuesday 16 Sep', 
      time: '03:00 PM', 
      fee: 'BHD5.00', 
      petType: 'Cat', 
      trainerImage: 'assets/doctor.jpg', 
      petImage: 'assets/cat.jpg' 
    },
   ];

  constructor(private router: Router) { }

  ngOnInit() { }

  goToDetail(booking: any) {
    this.router.navigate(['/bookingdetaill'], { state: { booking } });
  }
}
