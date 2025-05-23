import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bc-dashboard',
  templateUrl: './bc-dashboard.component.html',
  styleUrls: ['./bc-dashboard.component.css']
})
export class BcDashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();

    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
          datasets: [
            {
              label: 'Arrivées',
              data: [30, 45, 28, 50, 60, 55, 70],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4
            },
            {
              label: 'Départs',
              data: [25, 35, 22, 40, 50, 45, 60],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4
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
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
