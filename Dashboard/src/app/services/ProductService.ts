// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProviderProducts(providerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/by-provider/${providerId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching provider products:', error);
          return throwError(() => error);
        })
      );
  }
}
