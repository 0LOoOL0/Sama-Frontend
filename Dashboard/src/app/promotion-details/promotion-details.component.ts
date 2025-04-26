import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.css']
})
export class PromotionDetailsComponent implements OnInit {
  promotions: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    setTimeout(() => {
      this.promotions = [
        {
          title: 'Spring Discount',
          type: 'ready_to_launch',
          status: 'approved',
          created_at: '2025-03-01',
        },
        {
          title: 'New Pet Owner Deal',
          type: 'custom_ad_design',
          status: 'pending',
          created_at: '2025-03-10',
        }
      ];
      this.loading = false;
    }, 1200); // Simulate API delay
  }

  goBackToDashboard() {
    this.router.navigate(['/provider-dashboard']);
  }
}
