import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import axios from 'axios';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Code {
    id: number;
    affiliate: string;
    code: string;
    expiration_date: string;
    percentage: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }

@Injectable({
  providedIn: 'root'
})
export class CodeService {
    private apiUrl = `${environment.apiUrl}/api/codes`;
  
    constructor() {
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

  getCodes() {
    return axios.get(`${this.apiUrl}`);
  }

  getCodeById(id: number) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  getCodeByCode(code: string): Observable<Code | null> {
    return from(axios.get<Code>(`${this.apiUrl}/code/${code}`)).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching discount code:', error);
        return of(null);
      })
    );
  }

  createCode(codeData: Code) {
    return axios.post<Code>(this.apiUrl, codeData);
  }

  updateCode(id: number, codeData: Code) {
    axios.put<Code>(`${this.apiUrl}/${id}`, codeData);
  }

  deleteCode(id: number) {
    axios.delete<void>(`${this.apiUrl}/${id}`);
  }
}
