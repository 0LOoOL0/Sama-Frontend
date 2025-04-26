import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Order {
  id: number;
  created_at: string;
  pet_owner_id: number;
  invoice_date?: string;
  total_amount?: number;
  status?: string;
  OrderProducts?: OrderProduct[];
}

export interface OrderProduct {
  id?: number;
  product?: {
    id: number;
    name: string;
  };
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface NewOrder {
  id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  pet_owner_id: number;
  order_date?: string;
  amount: number;
  discount_amount?: number | null;
  status: 'pending' | 'completed' | 'canceled';
  metadata?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  // Store order (POST /orders)
  storeOrder(order: NewOrder): Observable<NewOrder> {
    return this.http.post<NewOrder>(this.apiUrl, order);
  }

  // Get order by ID (GET /orders/{order})
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // Update order (PUT /orders/{order})
  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, order);
  }

  // Get orders by pet owner using the backend method getOrdersByUserId
  // This endpoint must exist in your Laravel routes and controller.
  OrdersByUserId(petOwnerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/pet-owner/${petOwnerId}`);
  }
  
}
