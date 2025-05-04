import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCouponStats(providerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/provider-coupon-stats?provider_id=${providerId}`)
      .pipe(
        catchError(error => {
          console.error('Coupon stats fetch error:', error);
          return throwError(() => error);
        })
      );
  }

  getProviderCoupons(providerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/coupons/provider?provider_id=${providerId}`);
  }

}
