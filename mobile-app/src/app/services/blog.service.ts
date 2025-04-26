import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { map } from 'rxjs/operators';
export interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  updated_at?: string;
  tag: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/blogs`, { headers: this.getHeaders() });
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/blogs/${id}`, { headers: this.getHeaders() });
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/blogs`, blog, { headers: this.getHeaders() });
  }

  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/blogs/${id}`, blog, { headers: this.getHeaders() });
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/blogs/${id}`, { headers: this.getHeaders() });
  }
}