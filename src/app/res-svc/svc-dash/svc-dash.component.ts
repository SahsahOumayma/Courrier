import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvcDashService } from '../../services/svc-dash.service';
import feather from 'feather-icons';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-svc-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svc-dash.component.html',
  styleUrls: ['./svc-dash.component.css']
})
export class SvcDashComponent implements AfterViewInit {
  stats: any = {};
  last3Courriers: any[] = [];
  private dashboardService = inject(SvcDashService);

  ngAfterViewInit(): void {
    feather.replace();

    this.dashboardService.getDashboardData().subscribe((data: any) => {
      this.stats = {
        arriveeEnCours: data.arriveeEnCours,
        departEnCours: data.departEnCours,
        arriveeArchivee: data.arriveeArchive,
        departArchivee: data.departArchive
      };

      this.last3Courriers = data.last3Courriers || [];

      this.renderChart(
        data.monthlyLabels || [],
        data.monthlyArrivees || [],
        data.monthlyDeparts || []
      );
    });
  }

  renderChart(labels: string[], arrivees: number[], departs: number[]) {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    new Chart(context, {
      type: 'line' as ChartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Arrivées',
            data: arrivees,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#3B82F6'
          },
          {
            label: 'Départs',
            data: departs,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#10B981'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: { size: 13 }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) =>
                `${context.dataset.label} : ${context.formattedValue}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#555' }
          },
          x: {
            ticks: { color: '#555' }
          }
        }
      }
    });
  }
}
