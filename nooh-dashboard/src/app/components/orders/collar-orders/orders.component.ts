import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface collars{

  
}

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent {
  productsData: any[] = [];
  filteredProducts: any[] = [];
  ngOnInit(): void {
    this.fetchProducts();
  }

  private productsUrl = 'http://127.0.0.1:8000/api/collars';

  constructor(private httpClient: HttpClient) { }
  getproducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.productsUrl);
  }
  fetchProducts(): void {
    this.getproducts().subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);

        if (response && typeof response === 'object' && 'data' in response) {
          this.productsData = Array.isArray(response.data) ? response.data : [];
          this.filteredProducts = [...this.productsData];
          console.log("Product Data", this.productsData);
        } else {
          console.error("❌ Unexpected API response format:", response);
          this.productsData = [];
          this.filteredProducts = [];
        }
      },
      error: (error) => {
        console.error('❌ API Fetch Error:', error);
      }
    });
  }
}

