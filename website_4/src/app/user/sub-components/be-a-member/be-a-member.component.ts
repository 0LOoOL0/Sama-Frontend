import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { SubscribeService } from '../../../services/subscribe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-be-a-member',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './be-a-member.component.html',
  styleUrls: ['./be-a-member.component.css', '../../../shared/css/style.css']
})
export class BeAMemberComponent implements OnInit {
  packages: any[] = [];

  constructor(private subscribeService: SubscribeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.subscribeService.getUserPackages()
      .then((response: { data: any[] }) => {
        this.packages = response.data;
        console.log('Fetched packages (Be A Member):', this.packages);
      })
      .catch((error: any) => {
        console.error('Error fetching packages (Be A Member):', error);
      });
  }

  scrollToSection() {
    const element = document.querySelector('.membership-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  choose(pkg: any): void {
    this.router.navigate(['user-main-component/choose-pet'], {
      queryParams: {
        pkgId: pkg.id,
        pkgName: pkg.title,
        pkgPrice: pkg.price
      }
    });
  }
}
