import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BlogDashboardServiceService {
  private apiUrl = `${environment.apiUrl}/api`; // Adjust the endpoint if needed

  constructor() { 
    console.log("here:",this.apiUrl);
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
// Get all blogs
async getBlogs() {
  const token = localStorage.getItem('token');
  const result = await axios.get(this.apiUrl+'/blogs', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return result.data;
  }
  //delete blog
  async deleteBlog(id: number): Promise<void> {
    const url = `${this.apiUrl}/blogs/${id}`; // Correct endpoint for deleting a blog
    const token = localStorage.getItem('token');
  
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      // Log success response for better debugging
      console.log(`Blog with id=${id} deleted successfully`, response);
    })
    .catch(error => {
      // Check if error.response exists for better error handling
      if (error.response) {
        console.error(`Error deleting blog by id=${id}:`, error.response.data);
      } else {
        console.error(`Error deleting blog by id=${id}:`, error.message);
      }
    });
  }

  
}
