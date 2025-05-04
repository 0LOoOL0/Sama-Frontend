import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-collar-main-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './collar-main-page.component.html',
  styleUrl: './collar-main-page.component.css'
})
export class CollarMainPageComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private router: Router, private auth: UserAuthService){}
  
  ngOnInit(){
    this.logge();
  }

  async logge(){
    const profile = await this.auth.getProfile();
    console.log(profile);
    this.isLogged = !!profile; // Set isLogged to true if profile exists, else false
  }

  buy(){
    if(this.isLogged){
      this.router.navigate(['user-main-component/choose-pet'], { queryParams: { value: 'choose' } });
    }else{
      this.router.navigate(['user-main-component/user-log-sign']);
    }
    
  }
  scrollToHowToOrder(){
    const element = document.getElementById('how-to-order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  howWork(){
    const element = document.getElementById('how-work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  register(){this.buy();}
  sub(){this.router.navigate(['user-main-component/subscribe']);}

}
