import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  selectedTab: number = 1; // Default tab is "Gallery"

  // Function to handle tab selection
  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
  }

    tabs!: NodeListOf<HTMLButtonElement>;
    contents!: NodeListOf<HTMLElement>;
  
    ngOnInit() {
      this.tabs = document.querySelectorAll(".tab-button");
      this.contents = document.querySelectorAll(".tab-content");
  
      this.tabs.forEach((tab: HTMLButtonElement, index: number) => {
        tab.addEventListener("click", () => {
          this.tabs.forEach((t) => t.classList.remove("active"));
          this.contents.forEach((c) => c.classList.remove("show"));
  
          tab.classList.add("active");
          this.contents[index].classList.add("show");
        });
      });
    }
  }
  

 