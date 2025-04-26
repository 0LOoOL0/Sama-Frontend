import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { ProvidersService, Provider } from './providers.service';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' to return a fallback observable in case of errors
import { catchError } from 'rxjs/operators';


export interface Coupon {
  id: number;
  provider_id: number;
  quantity: number;
  code: string;
  expiration_date: string; 
  description: string;
  membership: number;
  title: string;
  image: string;
  price: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CouponUsage {
  id: number;
  owner_id: number;
  coupon_id: number;
  date_of_usage: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  coupon?: Coupon;  
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = `${environment.apiUrl}/api`;
  
  constructor(private providerService: ProvidersService) {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); 
        if (token) {
          // if (!config.headers) {
          //   config.headers = {};
          // }
          // config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }


  getCouponDetails(couponId: number): Observable<Coupon> {
    return from(axios.get<Coupon>(`${this.apiUrl}/coupons/${couponId}`)).pipe(
      map((response: AxiosResponse<Coupon>) => response.data)
    );
  }

  getProviderById(providerId: number): Observable<Provider> {
    return from(axios.get<Provider>(`${this.apiUrl}/providers/${providerId}`)).pipe(
      map((response: AxiosResponse<Provider>) => response.data)
    );
  }
  
  getMembershipCoupons(): Observable<Coupon[]> {
    return from(axios.get<Coupon[]>(`${this.apiUrl}/coupons/membership`)).pipe(
      tap(coupons => {
        console.log('Coupons data:', coupons.data);
      }),
      map((response: AxiosResponse<Coupon[]>) => response.data)  
    );
  }
  getNotMembershipCoupons(): Observable<Coupon[]> {
    return from(axios.get<Coupon[]>(`${this.apiUrl}/coupons/not-membership`)).pipe(
      tap(coupons => {
        console.log('Coupons data:', coupons.data);
      }),
      map((response: AxiosResponse<Coupon[]>) => response.data)  
    );
  }
  getCouponById(couponId: number): Observable<Coupon> {
    return from(axios.get<Coupon>(`${this.apiUrl}/coupons/${couponId}`)).pipe(
      map((response: AxiosResponse<Coupon>) => response.data)
    );
  }

  getCouponUsagesByOwnerId(ownerId: number): Observable<CouponUsage[]> {
    return from(axios.get<CouponUsage[]>(`${this.apiUrl}/coupon_usage/owner/${ownerId}`)).pipe(
      map((response: AxiosResponse<CouponUsage[]>) => response.data),
      tap(couponUsages => {
        console.log(`Coupon usages for owner ${ownerId}:`, couponUsages);
      }),
      catchError(error => {
        console.error(`Error fetching coupon usages for owner ${ownerId}:`, error);
        return of([]); 
      })
    );
  }
  
  async addCouponUsage(ownerId: number, couponId: number, dateOfUsage: string): Promise<AxiosResponse<any>> {
    const body = {
      owner_id: ownerId,
      coupon_id: couponId,
      date_of_usage: dateOfUsage
    };

    return axios.post(`${this.apiUrl}/coupon_usage`, body)
      .then(response => response)
      .catch(error => {
        console.error('Error occurred while adding coupon usage:', error);
        throw error; 
      });
  }

  async reduceCouponQuantity(couponId: number): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`${this.apiUrl}/coupons/${couponId}/reduce-quantity`);
      return response;
    } catch (error) {
      console.error('Error occurred while reducing coupon quantity:', error);
      throw error; 
    }
  }
}

