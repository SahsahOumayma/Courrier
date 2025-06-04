import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RhDashboardService } from '../../services/rh-dashboard.service';
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
  selector: 'app-rh-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rh-dashboard.component.html',
  styleUrls: ['./rh-dashboard.component.css']
})
export class RhDashboardComponent implements AfterViewInit {
  stats: any = {};
  last3Courriers: any[] = [];

  constructor(private rhDashboardService: RhDashboardService) {}

  ngAfterViewInit(): void {
    feather.replace();

    this.rhDashboardService.getDashboardData().subscribe((data: any) => {
      this.stats = {
        totalEmployes: data.totalEmployes,
        totalCourriersArchives: data.totalCourriersArchives,
        totalCourriersTraites: data.totalCourriersTraites,
        totalNonTraites: data.totalNonTraites
      };
      this.last3Courriers = data.last3Archives || [];
      this.renderChart(data.monthlyTrend || {});
    });
  }

  renderChart(monthlyTrend: { [key: string]: number }) {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!ctx) return;

    const moisFixes = [
      'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
    ];

    const valeurs: number[] = moisFixes.map((_, index) => {
      const key = `2025-${String(index + 1).padStart(2, '0')}`; // "2025-01" à "2025-12"
      return monthlyTrend[key] || 0;
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: moisFixes,
        datasets: [
          {
            label: 'Courriers Archivés',
            data: valeurs,
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14,165,233,0.2)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#0284c7'
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
            max: 100 // ✅ valeur maximale fixe
          }
        }
      }
    });
  }
}
