import { Component, OnInit } from '@angular/core';

interface Discount {
  id: number;
  title: string;
  description: string;
  selected: boolean;
  type: 'services' | 'products';
}

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.page.html',
  styleUrls: ['./discounts.page.scss'],
})
export class DiscountsPage implements OnInit {
  segment: string = 'services';
  searchTerm: string = '';
  selectAll: boolean = false;
  showSearchBar: boolean = false;
  discounts: Discount[] = [
    { id: 1, title: 'Service Discount 1', description: 'Service description 1.', selected: false, type: 'services' },
    { id: 2, title: 'Product Discount 1', description: 'Product description 1.', selected: false, type: 'products' },
    { id: 3, title: 'Service Discount 2', description: 'Service description 2.', selected: false, type: 'services' },
    { id: 4, title: 'Product Discount 2', description: 'Product description 2.', selected: false, type: 'products' }
  ];
  filteredDiscounts: Discount[] = [];
  showFilter: boolean = false;
  layout: string = 'list';
  selectedProductType: string = '';
  priceRange = { lower: 0, upper: 100 };
  petType: string = 'cat';
  reviews: number = 4;

  petDetails = {
    breed: 'Scottish',
    country: 'Bahrain',
    gender: 'Female',
    ownerName: 'Areej Al Khan',
    validDate: '21/04/2023'
  };

  constructor() {}

  ngOnInit() {
    this.filterDiscounts();
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  selectAllItems() {
    this.filteredDiscounts.forEach(discount => {
      discount.selected = this.selectAll;
    });
  }

  toggleProductType(type: string) {
    this.selectedProductType = this.selectedProductType === type ? '' : type;
  }

  resetFilters() {
    this.layout = 'list';
    this.selectedProductType = '';
    this.priceRange = { lower: 0, upper: 100 };
    this.petType = 'cat';
    this.reviews = 4;
  }

  segmentChanged() {
    this.selectAll = false;
    this.filterDiscounts();
  }

  filterDiscounts() {
    this.filteredDiscounts = this.discounts.filter(discount => discount.type === this.segment);
  }
}
