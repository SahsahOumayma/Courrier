import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';

declare const feather: any;

@Component({
  selector: 'app-bc-statistique',
  templateUrl: './bc-statistique.component.html',
  styleUrls: ['./bc-statistique.component.css']
})
export class BcStatistiqueComponent implements OnInit, AfterViewInit {
  stats: any;

  @ViewChild('monthlyStatsChart') monthlyStatsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('confidentialityChart') confidentialityChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byServiceChart') byServiceChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byEmployeeChart') byEmployeeChart!: ElementRef<HTMLCanvasElement>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAdminBcStats().subscribe(data => {
      this.stats = data;
      this.renderCharts();
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  renderCharts(): void {
    if (!this.stats) return;

    // 📈 Tendance mensuelle
    new Chart(this.monthlyStatsChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.stats.monthlyLabels,
        datasets: [
          {
            label: 'Arrivées',
            data: this.stats.monthlyArrivees,
            fill: false,
            tension: 0.4,
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6'
          },
          {
            label: 'Départs',
            data: this.stats.monthlyDeparts,
            fill: false,
            tension: 0.4,
            borderColor: '#f472b6',
            backgroundColor: '#f472b6'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    });

    // 🔐 Répartition par confidentialité
    const confLabels = Object.keys(this.stats.confidentialiteCounts || {});
    const confData = Object.values(this.stats.confidentialiteCounts || {});
    new Chart(this.confidentialityChart.nativeElement, {
      type: 'pie',
      data: {
        labels: confLabels,
        datasets: [{
          data: confData,
          backgroundColor: ['#60a5fa', '#f472b6', '#1e40af']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    // 📊 Courriers par service
    const services = Object.keys(this.stats.courriersByService || {});
    const arrivees = services.map(s => this.stats.courriersByService[s]?.arrivee || 0);
    const departs = services.map(s => this.stats.courriersByService[s]?.depart || 0);
    new Chart(this.byServiceChart.nativeElement, {
      type: 'bar',
      data: {
        labels: services,
        datasets: [
          {
            label: 'Arrivées',
            data: arrivees,
            backgroundColor: '#60a5fa'
          },
          {
            label: 'Départs',
            data: departs,
            backgroundColor: '#f9a8d4'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          legend: { position: 'top' }
        }
      }
    });

    // 👥 Courriers par employé
    const employes = Object.keys(this.stats.courriersByEmploye || {});
    const counts = Object.values(this.stats.courriersByEmploye || {});
    new Chart(this.byEmployeeChart.nativeElement, {
      type: 'bar',
      data: {
        labels: employes,
        datasets: [{
          label: 'Courriers traités',
          data: counts,
          backgroundColor: '#93c5fd'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            max: 30,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
}
