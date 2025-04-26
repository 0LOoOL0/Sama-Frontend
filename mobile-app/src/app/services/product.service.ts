import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
  pet_type: string[];
  images: string[];
  provider_id: number;
  averageRating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api`; // Ensure you have your API URL in the environments file

  constructor(private http: HttpClient) {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  // Fetch all products
getProducts(): Observable<Product[]> {
  return from(axios.get(`${this.apiUrl}/products`)).pipe(
    map(response => {
      const data = response.data;

      // Ensure data is an array of products
      if (Array.isArray(data)) {
        return data.map((product: any) => {
          // Parse the images and pet_type fields if needed
          if (typeof product.images === 'string') {
            try {
              product.images = JSON.parse(product.images) as string[];
            } catch (error) {
              console.error('Error parsing images:', error);
              product.images = []; // Set to empty array or default value in case of parsing error
            }
          }

          if (typeof product.pet_type === 'string') {
            try {
              product.pet_type = JSON.parse(product.pet_type) as string[];
            } catch (error) {
              console.error('Error parsing pet types:', error);
              product.pet_type = []; // Set to empty array if parsing fails
            }
          }

          // Return the product object
          return product as Product;
        });
      } else {
        throw new Error('Unexpected data format: expected an array');
      }
    }),
    catchError(error => {
      console.error('Error fetching products:', error);
      return throwError(() => new Error('Error fetching products')); // Propagate error
    })
  );
}


  getProductById(id: number): Observable<Product> {
    return from(axios.get(`${this.apiUrl}/products/${id}`)).pipe(
      map(response => {
        const data = response.data;

        // Ensure data conforms to the Product interface
        if (data && typeof data === 'object') {
          // Check if images field is a JSON string and parse it
          if (typeof data.images === 'string') {
            try {
              // Parse the JSON string to a string array
              data.images = JSON.parse(data.images) as string[];
            } catch (error) {
              console.error('Error parsing images:', error);
              data.images = []; // Set to empty array or default value in case of parsing error
            }
          }

          if (typeof data.pet_type === 'string') {
            try {
              data.pet_type = JSON.parse(data.pet_type) as string[];
            } catch (error) {
              console.error('Error parsing pet types:', error);
              data.pet_type = []; // Set to empty array if parsing fails
            }
          }  

          // Ensure the object matches the Product interface
          return data as Product;
        } else {
          throw new Error('Unexpected data format');
        }
      }),
      catchError(error => {
        console.error('Error fetching product:', error);
        return throwError(() => new Error('Error fetching product')); // Propagate error
      })
    );
  }

  // Fetch products by provider id
  getProductsByProvider(providerId: number): Observable<Product[]> {
    return from(
      axios.get(`${this.apiUrl}/providers/${providerId}/products`),
    ).pipe(
      map(response => {
        return response.data.data.map((product: any) => {
          product.images = JSON.parse(product.images); // Parse the JSON string to an array
          return product;
        });
      }),
    );
  }
}
