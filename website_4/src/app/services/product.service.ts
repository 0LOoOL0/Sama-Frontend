import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


export interface Product {
  isInCart: boolean;
  created_at: string;
  updated_at: string;
  isFavorite: boolean;
  id: number;
  name: string;
  old_price: number;
  new_price: number;
  percentage: number;
  quantity: number;
  description: string;
  contact_number: string;
  price?: number;          // <-- added for UI binding
  price_before?: number;   // <-- added for UI binding
  pet_type: string[];
  images: string[];
  provider_id: number;
  averageRating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Use the environment URL directly ("http://127.0.0.1:8000")
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    // Removed the example fetch call.
  }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return from(axios.get(`${this.apiUrl}/api/products`)).pipe(
      map(response => {
        const data = response.data as any[];
        return data.map((product: any) => {
          if (typeof product.images === 'string') {
            try {
              product.images = JSON.parse(product.images);
            } catch (error) {
              console.error('Error parsing images:', error);
              product.images = [];
            }
          }
          if (typeof product.pet_type === 'string') {
            try {
              product.pet_type = JSON.parse(product.pet_type);
            } catch (error) {
              console.error('Error parsing pet types:', error);
              product.pet_type = [];
            }
          }
          return product as Product;
        });
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Error fetching products'));
      })
    );
  }

  // Fetch product by id
  // Fetch product by id
// Fetch product by id
getProductById(id: number): Observable<Product> {
  return from(axios.get(`${this.apiUrl}/api/products/details/${id}`)).pipe(
    tap((response: any) => {
      console.log('Backend response for product:', response);
    }),
    map((response: any) => {
      let data = response.data as any;

      if (Array.isArray(data)) {
        if (data.length === 0) throw new Error('No product data returned');
        data = data[0];
      }

      if (typeof data.image_url === 'string') {
        try {
          data.images = JSON.parse(data.image_url);
        } catch {
          data.images = [data.image_url];
        }
      } else {
        data.images = [];
      }

      if (typeof data.pet_type === 'string') {
        try {
          data.pet_type = JSON.parse(data.pet_type);
        } catch {
          data.pet_type = [data.pet_type.toLowerCase()];
        }
      }

      if (typeof data.price === 'string') {
        data.price = parseFloat(data.price);
      }

      if (!data.name && data.product_name_en) {
        data.name = data.product_name_en;
      }

      // Map price from new_price for convenience
if (!data.price && data.new_price) {
  data.price = data.new_price;
}
if (!data.price_before && data.old_price) {
  data.price_before = data.old_price;
}


      return data as Product;
    }),
    catchError(error => {
      console.error('Error fetching product:', error);
      return throwError(() => new Error('Error fetching product'));
    })
  );
}




  // Fetch products by provider id
  // Fetch products by provider id
// Fetch products by provider id
getProductsByProvider(providerId: number): Observable<Product[]> {
  return from(axios.get(`${this.apiUrl}/api/providers/${providerId}/products`)).pipe(
    map(response => {
      const data = response.data as any[];
      return data.map((product: any) => {
        // Process images: if empty or not valid JSON, set default empty array
        if (typeof product.images === 'string') {
          try {
            // Only parse if it starts with '[' (indicating a JSON array)
            if (product.images.trim().startsWith('[')) {
              product.images = JSON.parse(product.images);
            } else {
              product.images = product.images ? [product.images] : [];
            }
          } catch (error) {
            console.error('Error parsing images:', error);
            product.images = [];
          }
        }
        // Process pet_type: if it's not a valid JSON array, wrap it in an array.
        if (typeof product.pet_type === 'string') {
          try {
            if (product.pet_type.trim().startsWith('[')) {
              product.pet_type = JSON.parse(product.pet_type);
            } else {
              product.pet_type = [product.pet_type];
            }
          } catch (error) {
            console.error('Error parsing pet types:', error);
            product.pet_type = [product.pet_type];
          }
        }
        return product as Product;
      });
    }),
    catchError(error => {
      console.error('Error fetching products by provider:', error);
      return throwError(() => new Error('Error fetching products by provider'));
    })
  );
}


}
