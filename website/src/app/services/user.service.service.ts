import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

axios.defaults.withCredentials = true;
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor() { }

  getAddress(): Observable<any> {
    const token = localStorage.getItem('provider_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return from(axios.get(`${this.apiUrl}/provider/address`, config));
  }
}
