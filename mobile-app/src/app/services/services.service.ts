import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { map } from 'rxjs/operators';
export interface Service {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  image: string;
  short_description: string;
  old_price: number;
  new_price: number;
  percentage: number;
  contact_number: string;
  pet_type: string;
  provider_id: number;
}
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {
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
      },
    );
  }

  getServices(): Observable<Service[]> {
    return from(axios.get<Service[]>(`${this.apiUrl}/services`)).pipe(
      map(response => response.data)
    );
  }

  getServiceById(id: number): Observable<Service> {
    return from(axios.get<Service>(`${this.apiUrl}/services/${id}`)).pipe(
      map(response => response.data)
    );
  }

  getServicesByProviderId(providerId: number): Observable<Service[]> {
    return from(axios.get<Service[]>(`${this.apiUrl}/services/providers/${providerId}/services`)).pipe(
      map(response => response.data)
    );
  }
}
