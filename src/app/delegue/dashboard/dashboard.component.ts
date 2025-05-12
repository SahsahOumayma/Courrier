import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  showConsulter = false;

  // méthode appelée au clic
  toggleConsulter() {
    this.showConsulter = !this.showConsulter;
  }

  ngAfterViewInit(): void {
    feather.replace();
    // Enregistrer les composants nécessaires
    Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [
            {
              label: 'Arrivées',
              data: [30, 45, 28, 50, 60, 55],
              borderColor: '#3B82F6',
              backgroundColor: '#93C5FD',
              fill: false,
              tension: 0.4
            },
            {
              label: 'Départs',
              data: [20, 35, 22, 40, 52, 48],
              borderColor: '#10B981',
              backgroundColor: '#6EE7B7',
              fill: false,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  }
}
