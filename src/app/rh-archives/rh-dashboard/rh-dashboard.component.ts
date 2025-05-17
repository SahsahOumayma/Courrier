import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-archives-dashboard',
  templateUrl: './rh-dashboard.component.html',
  styleUrls: ['./rh-dashboard.component.css']
})
export class RhDashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const ctx = document.getElementById('archiveChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
        datasets: [{
          label: 'Courriers Archivés',
          data: [10, 20, 15, 25, 30],
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,0.2)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: '#0284c7'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
