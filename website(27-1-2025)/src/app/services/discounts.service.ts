import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscountsService {
  constructor(private http: HttpClient) {}

  getAllPublicCoupons() {
    return this.http.get<any[]>(`${environment.apiUrl}/api/coupons/public`);
  }


  redeemCoupon(data: { pet_owner_id: string, coupon_id: number }) {
    return this.http.post(`${environment.apiUrl}/api/bought-coupons`, data);

  }
  
}
