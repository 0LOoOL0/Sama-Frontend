import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-provider-type',
  templateUrl: './select-provider-type.page.html',
  styleUrls: ['./select-provider-type.page.scss'],
})
export class SelectProviderTypePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  providers = [
    { id: 'clinic', name: 'Pet Clinic', description: 'Lorem ipsum dolor sit amet' },
    { id: 'shop', name: 'Pet Shop', description: 'Lorem ipsum dolor sit amet' },
    { id: 'groomer', name: 'Groomer Provide', description: 'Lorem ipsum dolor sit amet' },
    { id: 'doctor', name: 'Doctor / Trainer', description: 'Lorem ipsum dolor sit amet' },
  ];

  next() {
    console.log('Next button clicked');
   }
}
