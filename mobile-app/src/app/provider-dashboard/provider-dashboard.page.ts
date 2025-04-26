Chart.register(...registerables);
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.page.html',
  styleUrls: ['./provider-dashboard.page.scss'],
})
export class ProviderDashboardPage implements OnInit, AfterViewInit {

  percentage: number = 70; // Set your dynamic percentage value here

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Other initialization code if needed
  }

  ngAfterViewInit() {
    // Initialize chart after the view has been fully initialized
    this.createLineChart();
  }

  getStrokeDashArray(): string {
    const radius = 15.9155; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(this.percentage / 100) * circumference}, ${circumference}`;
    return strokeDasharray;
  }

  createLineChart() {
    const ctx = document.getElementById('dailyLineChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
          datasets: [{
            label: 'Daily Progress',
            data: [12, 19, 3, 5, 2, 3, 7], // Example data
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Day'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Progress'
              }
            }
          }
        }
      });
    }
  }
}
