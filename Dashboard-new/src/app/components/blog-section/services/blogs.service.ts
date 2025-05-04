import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from '../../models/blog.interface'; // Use the shared interface

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiUrl = 'http://127.0.0.1:8000/api/blogs';

  constructor(private http: HttpClient) { }

  list(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(this.apiUrl); // Listing Blogs
  }

  add(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.apiUrl, blog); // Adding Blogs
  }

  update(blog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.apiUrl}/${blog.id}`, blog); // Updating Blogs
  }

  delete(blog: IBlog): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${blog.id}`); // Deleting Blogs
  }

  show(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.apiUrl}/${id}`);
  }
}
