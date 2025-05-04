import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../app/services/ReportService';

@Component({
  selector: 'app-provider-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-report.component.html',
  styleUrls: ['./provider-report.component.css']
})
export class ProviderReportComponent implements OnInit {
  loading = false;
  totalSales = 0;
  totalProducts = 0;
  totalPromotions = 0;
  totalActiveCoupons = 0;
  barData: { label: string; value: number }[] = [];
  maxBarValue = 1;

  filters = {
    dateFrom: '',
    dateTo: '',
    selectedCategory: ''
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadDefaultData();
  }

  loadDefaultData(): void {
    this.loading = true;
    const providerId = 1;

    this.reportService.getProviderOverview(providerId).subscribe({
      next: (data) => {
        this.totalSales = data.totalServices || 0;
        this.totalProducts = data.totalProducts || 0;
        this.totalPromotions = data.totalPromotions || 0;
        this.totalActiveCoupons = data.totalActiveCoupons || 0;
        this.prepareBarData();
        this.loading = false;
      },
      error: () => {
        this.totalSales = 0;
        this.totalProducts = 0;
        this.totalPromotions = 0;
        this.totalActiveCoupons = 0;
        this.prepareBarData();
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.loading = true;
    // In a real app, filter logic would go here. We'll reuse default loading for now.
    setTimeout(() => {
      this.prepareBarData();
      this.loading = false;
    }, 500);
  }

  prepareBarData(): void {
    const data: { label: string, value: number }[] = [];

    if (!this.filters.selectedCategory || this.filters.selectedCategory === 'services') {
      data.push({ label: 'Services', value: this.totalSales });
    }
    if (!this.filters.selectedCategory || this.filters.selectedCategory === 'products') {
      data.push({ label: 'Products', value: this.totalProducts });
    }
    if (!this.filters.selectedCategory || this.filters.selectedCategory === 'promotions') {
      data.push({ label: 'Promotions', value: this.totalPromotions });
    }
    if (!this.filters.selectedCategory || this.filters.selectedCategory === 'coupons') {
      data.push({ label: 'Coupons', value: this.totalActiveCoupons });
    }

    this.barData = data;
    this.maxBarValue = Math.max(...data.map(d => d.value), 1);
  }

  showCategory(category: string): boolean {
    return !this.filters.selectedCategory || this.filters.selectedCategory === category;
  }

  goBack(): void {
    window.history.back();
  }

  printReport(): void {
    window.print();
  }

  clearFilters(): void {
    this.filters = {
      dateFrom: '',
      dateTo: '',
      selectedCategory: ''
    };
    this.loadDefaultData();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }
}
