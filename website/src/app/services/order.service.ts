import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface Order {
    id: number;
    created_at: string;
    quantity: number;
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

import { Injectable } from '@angular/core';

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
          // if (!config.headers) {
          //   config.headers = {};
          // }
          // config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // Store order (POST /orders)
  storeOrder(order: NewOrder): void{
    // return axios.post<NewOrder>(`${this.apiUrl}`, order)
    //   .then(response => response)
    //   .catch(error => {
    //     return Promise.reject(this.handleError(error)) as Promise<AxiosResponse<NewOrder>>;
    //   });
  }

  // Show order by ID (GET /orders/{order})
  getOrderById(orderId: number): void {
    // return axios.get<Order>(`${this.apiUrl}/${orderId}`)
    //   .then(response => response)
    //   .catch(error => Promise.reject(this.handleError(error).message));
  }
  // Show order by ID (GET /orders/{order})
  OrderById(orderId: number): void {
    // return axios.get<NewOrder>(`${this.apiUrl}/${orderId}`)
    //   .then(response => response)
    //   .catch(error => Promise.reject(this.handleError(error)) as Promise<AxiosResponse<{ orders: Order[] }>>);
  }

  // Update order (PUT /orders/{order})
  updateOrder(orderId: number, order: Order): void{
    // return axios.put<Order>(`${this.apiUrl}/${orderId}`, order)
    //   .then(response => response)
    //   .catch(error => Promise.reject(error));
  }

  // Get orders by pet owner (GET /orders/pet-owner/{petOwnerId})
  getOrdersByUserId(petOwnerId: number):void{
    // return axios.get<{ orders: Order[] }>(`${this.apiUrl}/pet-owner/${petOwnerId}`)
    //   .then(response => response.data)
    //   .catch(error => Promise.reject(error));
  }

  OrdersByUserId(petOwnerId: number): void {
    // return axios.get<{ orders: Order[] }>(`${this.apiUrl}/pet-owner/${petOwnerId}`)
    //   .then(response => response.data)
    //   .catch(error => Promise.reject(error));
  }
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || JSON.stringify(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    return new Error(errorMessage);
  }
}
function then(arg0: (response: any) => Order) {
  throw new Error('Function not implemented.');
}

