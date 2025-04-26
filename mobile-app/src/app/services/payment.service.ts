import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';

export interface Payment {
    pet_owner_id: number; 
    provider_id?: number | null;  
    card_id?: number | null; 
    order_id?: number | null; 
    coupon_id?: number | null; 
    package_id?: number | null; 
    payment_method: string;  
    amount: number;  
    discount_amount?: number | null; 
    currency: string;  
    transaction_id?: string | null; 
    status: 'pending' | 'completed' | 'failed';  
    description?: string | null;  
    payment_date: string;  
    metadata?: string | null; 
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/payments`;

  constructor() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // Store payment (POST /payments)
  storePayment(payment: Payment): Promise<Payment> {
    return axios.post<Payment>(`${this.apiUrl}`, payment)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Show payment by ID (GET /payments/{payment})
  getPaymentById(paymentId: number): Promise<Payment> {
    return axios.get<Payment>(`${this.apiUrl}/${paymentId}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Update payment (PUT /payments/{payment})
  updatePayment(paymentId: number, payment: Payment): Promise<Payment> {
    return axios.put<Payment>(`${this.apiUrl}/${paymentId}`, payment)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Get payments by pet owner (GET /payments/pet-owner/{petOwnerId})
  getPaymentsByUserId(petOwnerId: number): Promise<{ payments: Payment[] }> {
    return axios.get<{ payments: Payment[] }>(`${this.apiUrl}/pet-owner/${petOwnerId}`)
      .then(response => response.data) // This will be the whole response object
      .catch(error => Promise.reject(error));
  }
}
