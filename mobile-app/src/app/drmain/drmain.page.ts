import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drmain',
  templateUrl: './drmain.page.html',
  styleUrls: ['./drmain.page.scss'],
})
export class DrmainPage implements OnInit {

  days = [
    { name: 'M', available: true },
    { name: 'T', available: true },
    { name: 'W', available: true },
    { name: 'T', available: true },
    { name: 'F', available: true },
    { name: 'S', available: false },
    { name: 'S', available: false },
  ];

  clinics = [
    { name: 'Vet Clinic 1', image: 'assets/vet-clinic1.jpg' },
    { name: 'Vet Clinic 2', image: 'assets/vet-clinic2.jpg' },
    { name: 'Vet Clinic 3', image: 'assets/vet-clinic3.jpg' },
   ];

  services = [
    { name: 'Checkup', description: 'Lorem ipsum dolor sit amet.', oldPrice: 20, newPrice: 10, discount: 50, image: 'assets/service1.jpg' },
    { name: 'Checkup', description: 'Lorem ipsum dolor sit amet.', oldPrice: 20, newPrice: 10, discount: 50, image: 'assets/service2.jpg' },
    { name: 'Checkup', description: 'Lorem ipsum dolor sit amet.', oldPrice: 20, newPrice: 10, discount: 50, image: 'assets/service3.jpg' },
   ];

  slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 10,
    freeMode: true
  };

  constructor() { }

  ngOnInit() {
  }

}
