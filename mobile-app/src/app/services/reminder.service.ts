import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Reminder {
    id: number;
    pet_owner_id: number;
    pet_id?: number;
    title: string;
    date: string;
    time: string;
    remind: boolean;
    repeat: 'Doesn\'t Repeat' | 'Daily' | 'Weekly' | 'Monthly';
    note?: string;
    created_at?: string;
    updated_at?: string;
    provider_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private apiUrl = `${environment.apiUrl}/api`; // Ensure you have your API URL in the environments file

  constructor(private http: HttpClient) {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
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

  async addReminder(reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
    try {
      // Log the reminder data before sending
      console.log('Reminder data before sending:', reminder);

      // Send the reminder data to the server
      const response = await axios.post(`${this.apiUrl}/reminders`, reminder);
      
      // Log server response
      console.log('Server response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  }

  // Method to get reminders by owner ID
  getRemindersByOwnerId(ownerId: number) {
    return axios.get(`${this.apiUrl}/pet_owners/${ownerId}/reminders`);
  }

  getRemindersByPetId(petId: number) {
    return axios.get(`${this.apiUrl}/pets/${petId}/reminders`);
  }
  
  deleteReminder(reminderId: number) {
    return axios.delete(`${this.apiUrl}/reminders/${reminderId}`)
      .then(response => {
        // Log successful deletion
        console.log('Reminder deleted successfully', response.data);
        return response.data;
      })
      .catch(error => {
        // Log error details
        console.error('Error deleting reminder:', error.response?.data || error.message);
        throw error; // Re-throw the error to be handled by the calling code
      });
  }
}