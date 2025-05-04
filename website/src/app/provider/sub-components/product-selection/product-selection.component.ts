import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css',
})
export class ProductSelectionComponent {
  products = [
    { id: 1, name: 'Product 1', image: 'assets/product1.png' },
    { id: 2, name: 'Product 2', image: 'assets/product2.png' },
    { id: 3, name: 'Product 3', image: 'assets/product3.png' },
    { id: 4, name: 'Product 4', image: 'assets/product4.png' },
  ];

  editProduct(product: any) {
    // Your logic to edit the product
    console.log('Editing product:', product);
  }

  addProduct() {
    // Your logic to add a product
    console.log('Adding a new product');
  }

  continue() {
    // Your logic to continue to the next step
    console.log('Continuing to the next step');
  }
}
