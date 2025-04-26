import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BlogService, Blog } from '../services/blog.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  profile: any = {};
  blogs: Blog[] = [];
  selectedBlog: any = null;
  showBlogModal: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private blogService: BlogService,
  ) {}

  ngOnInit() {
    this.authService.fetchProfileData()
      .then(profileData => {
        this.profile = profileData;
        console.log('Profile data:', this.profile);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  
    this.blogService.getBlogs().subscribe(
      blogData => {
        // Sort blogs by created_at date in descending order
        this.blogs = blogData.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
  
        // Take the last 4 blogs
        this.blogs = this.blogs.slice(0, 4);
  
        console.log('Latest 4 blog data:', this.blogs);
      },
      error => {
        console.error('Error fetching blog data:', error);
      }
    );
  }
  
  showBlogDetails(blog: any) {
    this.selectedBlog = blog;
    this.showBlogModal = true;
  }

  closeBlogModal() {
    this.showBlogModal = false;
    this.selectedBlog = null;
  }

  goMyPetPage() {
    this.router.navigate(['/mypet']);
  }

  goOrdersPage() {
    this.router.navigate(['/orders']);
  }

  goCartPage() {
    this.router.navigate(['/cart']);
  }

  goMyFavPage() {
    this.router.navigate(['/favorite']);
  }

  goBlogsPage() {
    this.router.navigate(['/blog']);
  }
}
