import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';


export interface Order {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    pet_owner_id: number;
    provider_id: number;
    order_date: string;
    amount: number;
    discount_amount?: number | null;
    status: 'pending' | 'completed' | 'canceled';
    description?: string | null;
    metadata?: string | null;
    deliveryTime: string | null;
    quantity: number;
}

export interface NewOrder {
  id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  pet_owner_id: number;
  order_date: string;
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

  // Store order (POST /orders)
  storeOrder(order: NewOrder): Promise<NewOrder> {
    return axios.post<NewOrder>(`${this.apiUrl}`, order)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Show order by ID (GET /orders/{order})
  getOrderById(orderId: number): Promise<Order> {
    return axios.get<Order>(`${this.apiUrl}/${orderId}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Update order (PUT /orders/{order})
  updateOrder(orderId: number, order: Order): Promise<Order> {
    return axios.put<Order>(`${this.apiUrl}/${orderId}`, order)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }

  // Get orders by pet owner (GET /orders/pet-owner/{petOwnerId})
  getOrdersByUserId(petOwnerId: number): Promise<{ orders: Order[] }> {
    return axios.get<{ orders: Order[] }>(`${this.apiUrl}/pet-owner/${petOwnerId}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }
}

