import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service'; // adjust if needed
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common'; // 👈 ADD THIS

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss']
})
export class BlogDetailsPageComponent implements OnInit {
  blogTitle: string = '';
  blogAuthor: string = 'Admin';
  blogDate: string = '';
  blogDescription: string = '';
  blogImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.blogService.getBlogById(id).subscribe((blog) => {
      this.blogTitle = blog.title;
      this.blogDescription = blog.description;
      this.blogImage = blog.image;
      this.blogDate = new Date(blog.created_at).toLocaleDateString();
    });
  }
}
