import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
export interface Post {
  id: number; // You may want an ID for routing
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
  tag: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FooterComponent, CommonModule, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  daysInMonth!: number;
  firstDayOfMonth!: number;
  weeks: (number | null)[][]; // Correctly handle null for empty days

  
  tabs: string[] = ['All','Pet Health', 'Grooming', 'Pet Food', 'Training', 'Pet Toys'];
  activeTab: string = this.tabs[0];
  
  selectTab(tab: string): void {
    this.activeTab = tab; // Update active tab
  }

  get filteredPosts(): Post[] {
    return this.activeTab === 'All' 
      ? this.posts 
      : this.posts.filter(post => post.tag === this.activeTab);
  }

  posts: Post[] = [
    {
      id: 1,
      title: 'Top food cats to consider if you are first time owner',
      author: 'Corabelle Durand',
      date: '02.01.2022',
      content: 'Amet porttitor eget dolor morbi non arcu risus quis varius...',
      imageUrl: 'assets/sleepingDogBG.png',
      tag: 'Pet Health'
    },
    {
      id: 2,
      title: 'Grooming tips for your pet',
      author: 'John Doe',
      date: '03.01.2022',
      content: 'Grooming is essential for your pet’s health...',
      imageUrl: 'assets/grooming.png',
      tag: 'Grooming'
    },
    {
      id: 3,
      title: 'Best pet foods for your furry friend',
      author: 'Jane Smith',
      date: '04.01.2022',
      content: 'Choosing the right food for your pet can be challenging...',
      imageUrl: 'assets/petFood.png',
      tag: 'Pet Food'
    },
    {
      id: 4,
      title: 'Training your puppy: Essential tips',
      author: 'Emily Johnson',
      date: '05.01.2022',
      content: 'Training your puppy is crucial to ensure good behavior...',
      imageUrl: 'assets/training.png',
      tag: 'Training'
    },
    {
      id: 5,
      title: 'The best toys for your playful pet',
      author: 'Michael Brown',
      date: '06.01.2022',
      content: 'Keeping your pet entertained is vital for their happiness...',
      imageUrl: 'assets/petToys.png',
      tag: 'Pet health'
    },
    {
      id: 6,
      title: 'Understanding pet health: Common issues',
      author: 'Sarah Connor',
      date: '07.01.2022',
      content: 'Being aware of common health issues can help you take better care of your pet...',
      imageUrl: 'assets/petHealth.png',
      tag: 'Pet Health'
    }
  ];




  constructor(private router: Router) {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.weeks = [];
    
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  // Generate the calendar days
  generateCalendar(): void {
    // Get number of days in the current month
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    // Get the day of the week the month starts on (0 - Sunday, 6 - Saturday)
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // Create weeks array to store days
    this.weeks = [];
    let week: (number | null)[] = new Array(this.firstDayOfMonth).fill(null); // Initialize first week with nulls for empty days
    let day = 1;

    // Fill the weeks array with day numbers
    while (day <= this.daysInMonth) {
      week.push(day);
      day++;
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Push remaining days of the last week if it's not full
    if (week.length > 0) {
      this.weeks.push(week.concat(new Array(7 - week.length).fill(null))); // Fill remaining cells with null
    }
  }

  // Navigate to the previous month
  goToPrevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  // Navigate to the next month
  goToNextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Get the display name for the month and year
  getMonthYear(): string {
    const monthName = new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
    return `${monthName} ${this.currentYear}`;
  }


  // added on 2025
  navigateToPost() {
    this.router.navigate(['./user-main-component/blog-details']);
  }
}