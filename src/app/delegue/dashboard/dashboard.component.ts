import { Component, AfterViewInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
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

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  stats: any = {};
  last3Courriers: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngAfterViewInit(): void {
    feather.replace();

    this.dashboardService.getDashboardData().subscribe((data: any) => {
      this.stats = {
        arriveeEnCours: data.totalCourriersArrivee,
        departEnCours: data.totalCourriersDepart,
        arriveeArchivee: data.totalArriveeArchives,
        departArchivee: data.totalDepartArchives
      };

      this.last3Courriers = data.last3Courriers;

      this.renderChart(data.monthlyLabels, data.monthlyArrivees, data.monthlyDeparts);
    });
  }

  renderChart(labels: string[], arrivees: number[], departs: number[]) {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
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
              font: {
                size: 13
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label} : ${context.formattedValue}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // ✅ Valeur maximale forcée à 100
            ticks: {
              color: '#555'
            }
          },
          x: {
            ticks: {
              color: '#555'
            }
          }
        }
      }
    });
  }
}
