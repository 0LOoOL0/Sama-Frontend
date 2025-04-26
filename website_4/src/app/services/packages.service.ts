import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  private apiUrl = environment.apiUrl;
  private petId: number | null = null;

  constructor(private http: HttpClient) {
    // axios.interceptors.request.use(config => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     if (!config.headers) {
    //       config.headers = {};
    //     }      }
    //   return config;
    // },
    //   error => {
    //     return Promise.reject(error);
    //   }
    // );
  }

  

  getPackageById(id:number) {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/package/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
}
