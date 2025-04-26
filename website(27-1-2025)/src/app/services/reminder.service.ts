import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private apiUrl = environment.apiUrl;

  async createReminder(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/reminders`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getMyReminders(): Promise<any[]> {
    const token = localStorage.getItem('token');
    return axios.get<any[]>(`${this.apiUrl}/api/reminders/mine`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data as any[]);
  }

  async updateReminder(id: number, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.put(`${this.apiUrl}/api/reminders/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteReminder(id: number): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.delete(`http://127.0.0.1:8000/api/reminders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  
}
