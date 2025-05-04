import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', 
    '../../../shared/css/style.css', 
    '../../../shared/css/custom-style.css', 
    '../../../shared/css/resposiveness.css']
})
export class NavbarComponent {
  isLogged: boolean = false;
  profile:any;
  private apiUrl = environment.apiUrl;

  constructor(private router:Router, private auth:UserAuthService){
    this.isLoggedIn();
  }

  isLoggedIn() {
    this.profile = this.auth.getProfile();
    if(this.profile){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  logout(){
    const token = localStorage.getItem('token');
    return axios
      .post(
        `${this.apiUrl}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        localStorage.removeItem('token');
        console.log("logout success");
        this.router.navigate(['user-main-component/user-log-sign']);
      });
      
  }
}
