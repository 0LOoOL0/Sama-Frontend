import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss']
})
export class BlogDetailsPageComponent implements OnInit {

  blogTitle: string = '6 Tips to Keep Your Pet Healthy and Happy';
  blogAuthor: string = 'Cornelius Darrell';
  blogDate: string = '02.03.2022';
  blogContent: string[] = [
    'Lacus suspendisse faucibus interdum posuere dolor purus non enim. Velit laoreet id donec ultrices tincidunt arcu non. Malesuada fames ac turpis egestas maecenas. Purus sit amet luctus venenatis lectus magna fringilla urna.',
    'Sit amet justo donec enim diam vulputate. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Sed sed risus pretium quam vulputate dignissim suspendisse in est ante.'
  ];
  blogTags: string[] = ['Health', 'Care', 'Nutrition'];
  comments: any[] = [
    {
      author: 'Benjamin Combs',
      date: '7 January, 2022 at 5:23 pm',
      content: 'The key to more success is to create a vision. Be honest, communicate, then trust the process and stay focused. Life is like a bike. You have to keep moving.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addComment(author: string, email: string, content: string): void {
    this.comments.push({
      author,
      date: new Date().toLocaleString(),
      content
    });
  }

  navigateToBlogs() {
    this.router.navigate(['./user-main-component/blogs']);
  }
}
