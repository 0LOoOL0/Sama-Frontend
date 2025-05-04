import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IBlog } from '../../models/blog.interface'; // Shared interface

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule/*, RouterLink*/],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  public blogs: IBlog[] = []; // Initialize as an empty array

  constructor(private router: Router, private service: BlogsService) { }

  // Method to navigate to the CreatePostComponent
  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  ngOnInit(): void {
    this.getBlogList();
  }

  getBlogList() {
    this.service.list().subscribe(response => {
      this.blogs = response;  // Assign the fetched data to blogs
    },
    error => {
      console.error('Error fetching blogs:', error);
    });
  }


  isModalOpen = false; // To track modal visibility
  blogToDelete: IBlog | null = null; // Store the blog to delete

   // Function to open the modal
   openModal(blog: IBlog) {
    this.blogToDelete = blog;
    this.isModalOpen = true;
  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
    this.blogToDelete = null; // Clear the blog to delete
  }

  // Function to confirm deletion
  confirmDelete() {
    if (this.blogToDelete) {
      this.service.delete(this.blogToDelete).subscribe(
        response => {
          console.log('Delete response:', response);
          this.getBlogList(); // Refresh the blog list after deletion
          this.closeModal(); // Close the modal
        },
        error => {
          console.error('Error deleting blog:', error);
          this.closeModal(); // Close the modal even if there's an error
        }
      );
    }
  }

  navigateToEditPost(blog: IBlog) {
    // Navigate to the edit page with the blog id as parameter.
    this.router.navigate(['/create-post', blog.id]);
  }


  navigateToBlog() {
    this.router.navigate(['/all-blogs']);
  }
}
