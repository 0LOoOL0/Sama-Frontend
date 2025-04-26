import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { Pet } from './petinfo.service';

@Injectable({
  providedIn: 'root'
})
export class CollarService {
  private apiUrl = `${environment.apiUrl}/api`;
  constructor() { 
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

  async updateCollar(petId: number, code: string) {
    try {
        const fm = new FormData();
        fm.append('pet_id', petId.toString()); // Change petid to pet_id
        fm.append('code', code);
        const token = localStorage.getItem('token');
        return axios.post(`${this.apiUrl}/updateCollar`, fm, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        console.log(error);
        throw this.handleError(error);
    }
}

async getPetByCode(code: string): Promise<Pet> {
  try {
    const response = await axios.get(`${this.apiUrl}/collarCode/${code}`); // Adjust the endpoint as necessary
    return response.data.data.original ; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching pet by code:', error);
    throw error; // Rethrow the error for handling in the component
  }
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
