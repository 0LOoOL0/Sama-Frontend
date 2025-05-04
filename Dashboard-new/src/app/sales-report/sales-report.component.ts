import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent {
  constructor(private router: Router, private http: HttpClient) {}

  loading = true;
  error: string | null = null;
  sales: any[] = [];

  ngOnInit() {
    const providerId = 1;
    this.http.get<any[]>(`http://localhost:8000/api/provider-sales-report/${providerId}`).subscribe({
      next: (res) => {
        this.sales = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching sales report:', err);
        this.error = err?.error?.message || err.message || 'Unknown server error occurred.';
        this.loading = false;
      }
    });
  }

  goBackToDashboard() {
    this.router.navigate(['/provider-dashboard']);
  }
}
