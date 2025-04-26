import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  segment: string = 'coupons';
  coupons = [
    { name: 'PETS CABANA', description: 'Get your 30% off accessories' },
    { name: 'PET ARABIA', description: 'Receive 25% off grooming services' }
  ];
}