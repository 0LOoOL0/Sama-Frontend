import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesAndPermissionsService {
  private apiUrl = environment.apiUrl + '/admin';

  constructor() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        if (token) {
          // if (!config.headers) {
          //   config.headers = {};
          // }
          // config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  async getAllRoles() {
    return (await axios.get(`${this.apiUrl}/allRoles`));
  }

  async getAllPermissions() {
    return (await axios.get(`${this.apiUrl}/allPermissions`));
  }

  async getAllAdmins(){
    return (await axios.get(`${this.apiUrl}/allAdmins`));
  }

  async createRole(roleData: any) {
    return (await axios.post(`${this.apiUrl}/createRole`, roleData));
  }
  

}
