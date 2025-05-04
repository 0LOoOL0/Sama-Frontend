import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Adjust the path as necessary
import { environment } from '../../environments/environment';
import axios from 'axios';


interface registerAdminInfo {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role: string;
  status: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl: String = environment.apiUrl;

  constructor(private apiService: ApiService) { }

  getCSRFToken() {
    return axios.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  async login(credentials: any) {
    await this.getCSRFToken(); // Ensure CSRF token is fetched before login
    return axios
      .post(`${this.apiUrl}/admin/login`, credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
      })
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  }

  logout() {
    const token = localStorage.getItem('token');
    return axios
      .post(
        `${this.apiUrl}/admin/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        localStorage.removeItem('token');
      });
  }

  async registerAdmin(adminInfo: any) {
    const result = await axios.post(`${this.apiUrl}/admin/register`, adminInfo)
    return result.data;
  }
}