import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { map } from 'rxjs/operators';
export interface Doctor {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  provider_id: number;
  years_of_experience: number;
  image: string;
  medical_degree_and_specializtion: string;
}
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        if (token) {
          if (!config.headers) {
            config.headers = {};
          }
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  async getAllDoctors(): Promise<Doctor[]> {
    try {
      const response = await axios.get<Doctor[]>(`${this.apiUrl}/doctor_info`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  }

  async getDoctorById(id: number): Promise<Doctor> {
    try {
      const response = await axios.get<Doctor>(`${this.apiUrl}/doctor_info/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor with ID ${id}:`, error);
      throw error;
    }
  }
}