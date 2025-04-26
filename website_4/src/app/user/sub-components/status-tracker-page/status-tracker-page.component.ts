import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-status-tracker-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './status-tracker-page.component.html',
  styleUrls: ['./status-tracker-page.component.css']
})
export class StatusTrackerPageComponent implements OnInit {

  tabs: string[] = ['Adoption', 'Lost Pet', 'Mating', 'Selling'];
  items: any[] = [
    { title: 'Bagle cat', image: 'assets/bagle-cat.jpg', status: 'Adopted' },
    { title: 'Bagle cat', image: 'assets/bagle-cat.jpg', status: 'Adopted' },
    { title: 'Bagle cat', image: 'assets/bagle-cat.jpg', status: 'Reserved' },
    { title: 'Bagle cat', image: 'assets/bagle-cat.jpg', status: 'Adopted' }
  ];
  filteredItems: any[] = this.items;

  constructor() {}

  ngOnInit(): void {}

  selectTab(tab: string): void {
    this.filteredItems = this.items.filter(item => item.status.toLowerCase() === tab.toLowerCase());
  }
}
