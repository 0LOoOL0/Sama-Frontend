// src/app/services/service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProviderServices(providerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services/provider/${providerId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching provider services:', error);
          return throwError(() => error);
        })
      );
  }


  getSalesOverview(providerId: number) {
    return this.http.get<any>(`http://127.0.0.1:8000/api/sales-overview/${providerId}`);
  }
  
}
