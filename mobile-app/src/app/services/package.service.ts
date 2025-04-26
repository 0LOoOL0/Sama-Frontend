import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Membership {
  id: number;
  pet_id: number;
  package_id: number;
  start_date: string;
  end_date: string;
  // Add other relevant fields if necessary
}

@Injectable({
  providedIn: 'root',
})

export class PackageService {
  private apiUrl = environment.apiUrl; // Ensure you have your API URL in the environments file

  constructor(private http: HttpClient) {}

  async getPackages() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/packages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getMemberships() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/membership`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchPackages(): Promise<any> {
    return this.getPackages()
      .then(response => {
        console.log('getPackages response:', response);
        return response;
      })
      .catch(error => {
        console.error('Error fetching getPackages:', error);
        throw error;
      });
  }

  async fetchMemeberships(): Promise<any> {
    return this.getMemberships()
      .then(response => {
        console.log('getPackages response:', response);
        return response;
      })
      .catch(error => {
        console.error('Error fetching getPackages:', error);
        throw error;
      });
  }

  async storeMembership(data: { package_id: number; pet_ids: number[]; start_date: string; end_date: string }) {
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/membership`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteMembership(membershipId: number): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.delete(`${this.apiUrl}/api/membership/${membershipId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('deleteMembership response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error deleting membership:', error);
      throw error;
    });
  }
}
