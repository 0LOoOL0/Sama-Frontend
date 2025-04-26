import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discounthistory',
  templateUrl: './discounthistory.page.html',
  styleUrls: ['./discounthistory.page.scss'],
})
export class DiscounthistoryPage implements OnInit {
  discountHistory = [
    {
      date: '13 January 2024',
      service: 'Cat Grooming Services',
      place: 'Pet Cabana',
      originalPrice: 'BHD 7.000',
      saved: 'BHD 5.000',
      paid: 'BHD 2.000',
      image: 'assets/service-image.jpg'
    },
    // Add more items as needed
  ];

  filteredHistory = [...this.discountHistory];
  totalSaved = 'BHD 129';
  transactionType: string = 'Product';
  startDate: string | null = null;
  endDate: string | null = null;
  showStartDatePicker: boolean = false;
  showEndDatePicker: boolean = false;
  isFilterModalOpen: boolean = false; // Modal state

  constructor() { }

  ngOnInit() { }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  resetFilters() {
    this.transactionType = 'Product';
    this.startDate = null;
    this.endDate = null;
    this.filteredHistory = [...this.discountHistory];
    this.closeFilterModal();
  }

  applyFilters() {
    this.filteredHistory = this.discountHistory.filter(item => {
      let matchesType = true;
      if (this.transactionType) {
        matchesType = item.service.toLowerCase().includes(this.transactionType.toLowerCase());
      }
      
      let matchesDate = true;
      if (this.startDate && this.endDate) {
        const itemDate = new Date(item.date);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        matchesDate = itemDate >= start && itemDate <= end;
      }

      return matchesType && matchesDate;
    });

    this.closeFilterModal();
  }

  toggleDatePicker(type: 'start' | 'end') {
    if (type === 'start') {
      this.showStartDatePicker = !this.showStartDatePicker;
    } else {
      this.showEndDatePicker = !this.showEndDatePicker;
    }
  }

  onStartDateChange(event: any) {
    this.startDate = event.detail.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.detail.value;
  }
}