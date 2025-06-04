import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import { SiDashService } from '../../services/si-dash.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-si-dashboard',
  templateUrl: './si-dashboard.component.html',
  styleUrls: ['./si-dashboard.component.css'],
  standalone: true,
  imports: []
})
export class SiDashboardComponent implements AfterViewInit {
  dashboardData: any;

  constructor(private dashService: SiDashService) {}

  ngAfterViewInit(): void {
    feather.replace();
    this.dashService.getDashboard().subscribe((data) => {
      this.dashboardData = data;
      this.initChart(data.employeesPerRole);
    });
  }

  initChart(roleData: { [key: string]: number }) {
    const ctx = document.getElementById('regChart') as HTMLCanvasElement;
    if (!ctx || !roleData) return;

    const labels = Object.keys(roleData);
    const values = Object.values(roleData);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Employés par rôle',
          data: values,
          backgroundColor: '#0ea5e9',
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}
