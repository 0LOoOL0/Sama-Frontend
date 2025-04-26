// src/app/services/subscribe.service.ts
import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // Adjust path if needed

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private apiUrl = environment.apiUrl || 'http://127.0.0.1:8000';

  // Fetch packages with status_user set to 1
  getUserPackages(): Promise<any> {
    const token = localStorage.getItem('token');
    // Cast the Axios call as a native Promise<any>
    return axios.get(`${this.apiUrl}/api/package/getUserPackages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) as Promise<any>;
  }
}
