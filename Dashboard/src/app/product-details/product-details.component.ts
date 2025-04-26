import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ProductService } from '../../app/services/ProductService'; // adjust path


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  loading = true
  error: string | null = null
  products: any[] = []

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    const providerId = 1; // You can replace this with dynamic value later if needed

    this.productService.getProviderProducts(providerId).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBackToDashboard() {
    this.router.navigate(['/provider-dashboard'])
  }
}
