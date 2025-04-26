import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.page.html',
  styleUrls: ['./provider-profile.page.scss'],
})
export class ProviderProfilePage implements OnInit {
  weekdays: string[] = ['M', 'T', 'W', 'H', 'F', 'S', 'U'];
  selectedDays: string[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  selectedImage1: string | ArrayBuffer | null = null;
  selectedImage2: string | ArrayBuffer | null = null;
  defaultImage: string = '../../assets/provider.svg';
  defaultImagep: string = '../../assets/cam.svg';
  startTime: string = '08:00';
  endTime: string = '17:00';
  isInvalidTime: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  displayImage(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        if (type === 'profile') {
          this.selectedImage = e.target?.result ?? null;
        } else if (type === 'contract') {
          this.selectedImage1 = e.target?.result ?? null;
        } else if (type === 'certificate') {
          this.selectedImage2 = e.target?.result ?? null;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  isSelected(day: string): boolean {
    return this.selectedDays.includes(day);
  }

  toggleDaySelection(day: string) {
    if (this.isSelected(day)) {
      this.selectedDays = this.selectedDays.filter(d => d !== day);
    } else {
      this.selectedDays.push(day);
    }
  }
  navigateToProviderProfile1() {
    try {
      if (this.router.url !== '/provider-profile1') {
        this.router.navigate(['/provider-profile1']);
      } else {
        console.log('Already on the page');
      }
    } catch (error) {
      console.error(' there was an error:', error);
    }
  }
  updateStartTime(event: any) {
    this.startTime = event.detail.value;
  }

  updateEndTime(event: any) {
    this.endTime = event.detail.value;
  }

  validateTimes() {
    if (this.startTime >= this.endTime) {
      this.isInvalidTime = true;
      this.endTime = this.startTime;
    } else {
      this.isInvalidTime = false;
    }
  }
}
