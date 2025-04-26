import { Component, OnInit } from '@angular/core';
import { BlogService, Blog } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  blogs: Blog[] = [];  
  filteredBlogs: Blog[] = [];  // New array for filtered blogs
  selectedBlog: Blog | null = null;
  showBlogModal: boolean = false;
  searchQuery: string = ''; // New property for search query

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      blogData => {
        this.blogs = blogData;
        this.filteredBlogs = blogData; // Initialize filtered blogs
        console.log('Blog data:', this.blogs);
      },
      error => {
        console.error('Error fetching blog data:', error);
      }
    );
  }

  showBlogDetails(blog: Blog) {
    this.selectedBlog = blog;
    this.showBlogModal = true;
  }

  closeBlogModal() {
    this.showBlogModal = false;
    this.selectedBlog = null;
  }

  filterBlogs() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBlogs = this.blogs.filter(blog => {
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tag.toLowerCase().includes(query) // Assuming `tag` is a string
      );
    });
  }
}
