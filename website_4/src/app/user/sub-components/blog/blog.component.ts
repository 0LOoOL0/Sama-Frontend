import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { BlogService, Blog } from '../../../services/blog.service'; // <-- Import
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  tabs: string[] = ['All', 'Pet Health', 'Grooming', 'Pet Food', 'Training', 'Pet Toys'];
  activeTab = 'All';

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
      console.log('Fetched blogs:', data); // ✅ Check what’s being returned
      this.blogs = data;
    });
  }
  

  get filteredPosts(): Blog[] {
    return this.activeTab === 'All' ? this.blogs : this.blogs.filter(post => post.tag === this.activeTab);
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  navigateToPost(post: Blog): void {
    this.router.navigate(['./user-main-component/blog-details', post.id]); // Adjust routing if needed
  }
}
