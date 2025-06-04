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

        // ✔️ Adapter à la nouvelle structure
        if (data.monthlyLabels && data.monthlyArrivees && data.monthlyDeparts) {
          this.renderChart(data.monthlyLabels, data.monthlyArrivees, data.monthlyDeparts);
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

  renderChart(labels: string[], arrivees: number[], departs: number[]): void {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chartInstance) this.chartInstance.destroy();

    this.chartInstance = new Chart(canvas, {
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
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100 // ✅ Fixe la hauteur maximale à 100
          }
        }
      }
    });
  }
}
