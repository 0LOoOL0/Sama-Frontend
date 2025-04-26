import { Component, OnInit } from '@angular/core';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.scss'],
})
export class DevPage implements OnInit {
  routes = routes;

  constructor() {}

  ngOnInit() {}
}
