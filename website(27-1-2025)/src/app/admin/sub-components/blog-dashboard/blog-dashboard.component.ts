import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlogDashboardServiceService } from '../../../services/blog-dashboard-service.service';
@Component({
  selector: 'app-blog-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './blog-dashboard.component.html',
  styleUrl: './blog-dashboard.component.scss',

})
export class BlogDashboardComponent {
  blogs: { title: string, description: string, id: number, canDelete: boolean, created_at: string,  }[] = [];
  newBlog = {}; // Object to hold new blog data
  searchQuery: string = ''; 
  filteredBlogs : any[] = []; // Array to hold filtered services
  toDate: string = '';
  fromDate: string = '';


  constructor(private blogDashboardService: BlogDashboardServiceService, private router: Router) {}

  ngOnInit() {
    this.loadBlogs().then(() => {
      this.filterBlogs();
    });
  }
  // Function to load blogs from the backend
  async loadBlogs() {
    try {
      const data = await this.blogDashboardService.getBlogs();
      this.blogs = data.map((blog: { canDelete: any; }) => {
        return ({
          ...blog,
          canDelete: blog.canDelete ?? true // Add default value if missing
        });
      });
      console.log('Fetched blogs data:', this.blogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  }
  
  // Function to delete a blog post
  async deleteBlog(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) {
      return; // Exit if the user does not confirm
    }
    try {
      await this.blogDashboardService.deleteBlog(id);
      console.log('Deleting service with ID:', id);
      this.blogs = this.blogs.filter(blog => blog.id !== id);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  // Function to filter blogs based on the search query
  filterBlogs() {
    this.filteredBlogs = this.blogs;
    const query = this.searchQuery.toLowerCase();
    this.filteredBlogs = this.blogs.filter(blog => {
      let searchResult = true
      if (query) {
        searchResult = blog.title.toLowerCase().includes(query) || blog.description.toLowerCase().includes(query)
      }
      console.log('searchResult:', searchResult);
      if (this.fromDate) {
        searchResult = searchResult && new Date(blog.created_at) >= new Date(this.fromDate);
      }
      if (this.toDate) {
        searchResult = searchResult && new Date(blog.created_at) <= new Date(this.toDate);
      }
      return searchResult;
    });
  }
  goToBlogForm() {
    this.router.navigateByUrl('/admin-main/blog-form');
  }
}
   

