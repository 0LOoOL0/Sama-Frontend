import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sama1',
  templateUrl: './sama1.page.html',
  styleUrls: ['./sama1.page.scss'],
})
export class Sama1Page implements OnInit {
  segment: string = 'coupons';
  products = [1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit() {}
}
