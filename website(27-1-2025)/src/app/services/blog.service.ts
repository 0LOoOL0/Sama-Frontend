import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  tag: string;
  image: string;
  description: string;
}

@Injectable({
    providedIn: 'root',
  })
  export class BlogService {
    private apiUrl = 'http://localhost:8000/api'; // ✅ just `/api`, not `/api/blogs`
  
    constructor(private http: HttpClient) {}
  
    getAllBlogs(): Observable<Blog[]> {
      return this.http.get<Blog[]>(`${this.apiUrl}/blogs`);
    }
  
    getBlogById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/blogs/${id}`); // ✅ Correct
    }
  }
  
