import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-providercreactacc',
  templateUrl: './providercreactacc.page.html',
  styleUrls: ['./providercreactacc.page.scss'],
})
export class ProvidercreactaccPage implements OnInit {

 
  ngOnInit() {
  }

  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private router: Router) {}

  onRegister() {
    if (this.password === this.confirmPassword) {
      // Handle registration logic here
    } else {
      // Handle password mismatch error
    }
  }
}