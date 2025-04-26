import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  faqs: any[] = [
    { question: 'What is Sama Pet Care Website?', answer: 'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.', open: false },
    { question: 'What Services offers in the website?', answer: 'We offer a variety of services including pet grooming, training, adoption listings, and pet care services.', open: false },
    { question: 'Is their any fees for the website Services?', answer: 'No, there are no fees for browsing and accessing the website services.', open: false },
    { question: 'Is their a fees for the membership?', answer: 'Yes, membership plans have different fees based on the selected plan.', open: false },
    { question: 'How can I get the membership?', answer: 'You can get a membership by signing up on our website and selecting the plan that suits you.', open: false },
    { question: 'Where can I add my pet?', answer: 'You can add your pet by going to the Pet Profiles section and creating a new profile.', open: false }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleFaq(faq: any): void {
    faq.open = !faq.open;
  }
}
