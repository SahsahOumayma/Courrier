import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBcService } from '../../services/dash-bc.service';
import * as feather from 'feather-icons';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-bc-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bc-dashboard.component.html',
  styleUrls: ['./bc-dashboard.component.css']
})
export class BcDashboardComponent implements OnInit, AfterViewInit {
  stats = {
    totalCourriersArrivee: 0,
    totalCourriersDepart: 0,
    totalArriveeArchives: 0,
    totalDepartArchives: 0
  };
  last3Courriers: any[] = [];
  chartInstance: Chart | null = null;

  constructor(private dashBcService: DashBcService) {}

  ngOnInit(): void {
    this.dashBcService.getDashboardData().subscribe({
      next: (data) => {
        this.stats = {
          totalCourriersArrivee: data.totalCourriersArrivee ?? 0,
          totalCourriersDepart: data.totalCourriersDepart ?? 0,
          totalArriveeArchives: data.totalArriveeArchives ?? 0,
          totalDepartArchives: data.totalDepartArchives ?? 0
        };
        this.last3Courriers = data.last3Courriers ?? [];

        if (data.monthlyTrend && Object.keys(data.monthlyTrend).length > 0) {
          this.renderChart(data.monthlyTrend);
        }
      },
      error: (err) => {
        console.error('Erreur API :', err);
      }
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  renderChart(monthlyTrend: Record<string, number>): void {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chartInstance) this.chartInstance.destroy();

    this.chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: Object.keys(monthlyTrend),
        datasets: [{
          label: 'Courriers par mois',
          data: Object.values(monthlyTrend),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
