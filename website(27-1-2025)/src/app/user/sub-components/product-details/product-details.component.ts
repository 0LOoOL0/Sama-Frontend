import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgIf, NgFor } from '@angular/common'; // optional if you want to be extra specific
import { ProductService } from '../../../services/product.service';

export interface Product {
  id: number;
  product_name_en: string;
  product_description_en: string;
  price: number;
  images: string[];
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule /*, NgIf, NgFor */],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedQuantity: number = 1;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.location.back();
      return;
    }
    const id = Number(idParam);
    this.productService.getProductById(id).subscribe({
      next: (data: any) => {
        console.log('Data received in component:', data);
        this.product = data;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error fetching product details in component', err);
      }
    });
  }
  

  onQuantityChange(newQuantity: number): void {
    this.selectedQuantity = newQuantity;
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    if (this.product && this.product.price != null) {
      this.totalPrice = this.product.price * this.selectedQuantity;
    } else {
      this.totalPrice = 0;
    }
  }
}
