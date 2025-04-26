import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-service',
  templateUrl: './pet-service.page.html',
  styleUrls: ['./pet-service.page.scss'],
})
export class PetServicePage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

}
