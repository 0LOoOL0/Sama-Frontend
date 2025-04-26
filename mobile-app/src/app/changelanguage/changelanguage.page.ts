import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changelanguage',
  templateUrl: './changelanguage.page.html',
  styleUrls: ['./changelanguage.page.scss'],
})
export class ChangelanguagePage implements OnInit {

  selectedLanguage: string;

  constructor() { 
     this.selectedLanguage = 'en';  
  }

  ngOnInit() { }

  changeLanguage() {
    console.log('Language changed to:', this.selectedLanguage);
   }
}