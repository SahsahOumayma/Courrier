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
      this.renderChart(data.monthlyTrend);
    });
  }

  renderChart(monthlyTrend: { [key: string]: { arrivees: number, departs: number } }) {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (!monthlyTrend || Object.keys(monthlyTrend).length === 0) {
      console.warn('Aucune donnée disponible pour le graphique mensuel.');
      return;
    }

    const mois = Object.keys(monthlyTrend).map(dateStr => {
      const [year, month] = dateStr.split('-');
      const moisDate = new Date(Number(year), Number(month) - 1);
      return moisDate.toLocaleString('fr-FR', { month: 'short' }); // Ex: janv., févr.
    });

    const arrivees = Object.values(monthlyTrend).map(m => m.arrivees ?? 0);
    const departs = Object.values(monthlyTrend).map(m => m.departs ?? 0);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: mois,
        datasets: [
          {
            label: 'Arrivées',
            data: arrivees,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Départs',
            data: departs,
            borderColor: '#F472B6',
            backgroundColor: 'rgba(244, 114, 182, 0.1)',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 70
          }
        }
      }
    });
  }
}