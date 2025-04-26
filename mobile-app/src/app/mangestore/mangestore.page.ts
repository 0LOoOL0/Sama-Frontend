import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangestore',
  templateUrl: './mangestore.page.html',
  styleUrls: ['./mangestore.page.scss'],
})

export class MangestorePage implements OnInit {
  selectedSegment: string = 'services';
  fabText: string = 'Add Service';

  services: Service[] = [
    {
      name: 'Bathing',
      description: 'Lorem ipsum dolor sit.',
      price: 'BD25.00',
      discountPrice: 'BD20.00',
      image: 'assets/images/bathing.jpg',
    },
    // more services
  ];

  products: Product[] = [
    {
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit.',
      price: 'BD10.00',
      discountPrice: 'BD8.00',
      image: 'assets/images/product1.jpg',
    },
    // more products
  ];

  constructor() {}

  ngOnInit() {}

  segmentChanged(event: any) {
    if (this.selectedSegment === 'services') {
      this.fabText = 'Add Service';
    } else {
      this.fabText = 'Add Product';
    }
  }

  addServiceOrProduct() {
    if (this.selectedSegment === 'services') {
      // Add service logic
    } else {
      // Add product logic
    }
  }

  editService(service: Service) {
    // Edit service logic
  }

  deleteService(service: Service) {
    // Delete service logic
  }

  editProduct(product: Product) {
    // Edit product logic
  }

  deleteProduct(product: Product) {
    // Delete product logic
  }
}
interface Service {
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  image: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  image: string;
}