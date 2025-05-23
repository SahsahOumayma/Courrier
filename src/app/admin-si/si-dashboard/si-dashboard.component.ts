import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-si-dashboard',
  standalone: true,
  templateUrl: './si-dashboard.component.html',
  styleUrls: ['./si-dashboard.component.css'],
  imports: []
})
export class SiDashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    feather.replace(); // active les icônes Feather

    this.initChart(); // crée un graphique d'exemple
  }

  initChart(): void {
    const ctx = document.getElementById('regChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
          datasets: [{
            label: 'Utilisateurs',
            data: [5, 12, 8, 15, 10, 18, 14],
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
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
