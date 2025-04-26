import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.css'
})
export class MainHomeComponent {

  constructor(private router:Router){}
  discover(){this.router.navigate(['our-services']);}
  sub(){this.router.navigate(['user-main-component/subscribe']);}
  buyNow(){
    if(localStorage.getItem('token')){
      this.router.navigate(['user-main-component/choose-pet'], { queryParams: { value: 'choose' } });
    }else{
      this.router.navigate(['user-main-component/user-log-sign']);
    }
  }

  learn(){this.router.navigate(['/user-main-component/collar-main']);}

  visit(url: string){this.router.navigate([`/user-main-component/${url}`]);}
  provider(url: string){this.router.navigate(['/user-main-component/providers'],{ queryParams: { filter: url } });}

  scrollToHowToOrder(){
    const element = document.getElementById('package_plan');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
