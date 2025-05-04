import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-status-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-status-tracker.component.html',
  styleUrls: ['./new-status-tracker.component.scss']
})
export class NewStatusTrackerComponent implements OnInit {
  tabs: string[] = ['Adoption', 'Lost Pet', 'Mating', 'Selling' , 'pet History'];
  activeTab: string = this.tabs[0];
  items: { [key: string]: any[] } = {
    Adoption: [
      { approval: 'pending', title: 'Bagle Cat', image: 'assets/img/adoption-slider-img-1.png', status: 'Available' },
      { approval: 'pending', title: 'Golden Retriever', image: 'assets/img/adoption-slider-img-1.png', status: 'Available' },
      { approval: 'pending', title: 'Golden Retriever', image: 'assets/img/adoption-slider-img-1.png', status: 'Available' }
    ],
    'Lost Pet': [
      { approval: 'pending', title: 'Siamese Cat', image: 'assets/img/adoption-slider-img-1.png', status: 'Lost' }
    ],
    Mating: [
      { approval: 'pending', title: 'Bulldog', image: 'assets/img/adoption-slider-img-1.png', status: 'Available' }
    ],
    Selling: [
      { approval: 'pending', title: 'Persian Cat', image: 'assets/img/adoption-slider-img-1.png', status: 'For Sale' }
    ],
    'pet History': [
      { approval: 'approved', title: 'Persian Cat', image: 'assets/img/adoption-slider-img-1.png', status: 'Adopted' },
      { approval: 'approved', title: 'Persian Cat', image: 'assets/img/adoption-slider-img-1.png', status: 'Sold' }
    ]
  };
  filteredItems: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filteredItems = this.items[this.activeTab]; // Initialize with items for the default tab
  }

  selectTab(tab: string): void {
    this.activeTab = tab; // Update active tab
    this.filteredItems = this.items[tab]; // Get items for the selected tab
  }

  isPopupVisible: boolean = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}