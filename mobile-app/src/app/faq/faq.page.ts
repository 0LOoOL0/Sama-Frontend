import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {
  ngOnInit() {}
  faqList = [
    { question: 'What is this?', answer: 'it’s this.', open: false },
    { question: 'What is this?', answer: 'it’s this.', open: false },
    { question: 'What is this?', answer: 'it’s this.', open: false },
    { question: 'What is this?', answer: 'it’s this.', open: false },
  ];

  toggleAnswer(item: any) {
    item.open = !item.open;
  }

  constructor() {}
}
