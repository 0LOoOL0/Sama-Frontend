import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Add this line
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-discount-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule], // ✅ Add CommonModule here
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.css', '../../../shared/css/style.css']
})
export class DiscountDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedQuantity: number = 1;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/']);
      return;
    }
    const id = Number(idParam);
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Failed to load product details', err);
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

  addToCart() {
    if (!this.product) return;
  
    let existingCart = localStorage.getItem('tempCart');
    let cartArray: any[] = [];
  
    if (existingCart) {
      try {
        const parsed = JSON.parse(existingCart);
        if (Array.isArray(parsed)) {
          cartArray = parsed;
        } else if (parsed.product_id) {
          cartArray = [parsed];
        }
      } catch (e) {
        console.error('Failed to parse existing tempCart:', e);
      }
    }
  
    const alreadyExists = cartArray.find(item => item.product_id === this.product!.id);
  
    if (!alreadyExists) {
      cartArray.push({
        product_id: this.product.id,
        provider_id: this.product.provider_id,
        quantity: this.selectedQuantity,
        maxQuantity: this.product.quantity || 10,
        imageUrl: this.product.images?.[0] || 'assets/default-image.png',
        label: this.product.name,
        price: this.product.price,
        selected: true
      });
    } else {
      alreadyExists.quantity += this.selectedQuantity;
    }
  
    localStorage.setItem('tempCart', JSON.stringify(cartArray));
  
    // ✅ Show a native success alert
    alert('✅ Product successfully added to your cart!');
  }
  
  
  
  
  
  
}
