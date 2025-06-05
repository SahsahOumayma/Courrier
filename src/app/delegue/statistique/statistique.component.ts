import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { StatistiqueDelService } from '../../services/statistique-del.service';

declare const feather: any;

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistique.component.html',
  styleUrls: []
})
export class StatistiqueComponent implements OnInit, AfterViewInit {
  @ViewChild('monthlyStatsChart') monthlyStatsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('confidentialityChart') confidentialityChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byServiceChart') byServiceChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byEmployeeChart') byEmployeeChart!: ElementRef<HTMLCanvasElement>;

  stats: any = {};

  constructor(private statsService: StatistiqueDelService) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe((data) => {
      this.stats = data;
      setTimeout(() => this.initCharts(), 100); // attendre que le DOM soit prêt
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  initCharts(): void {
    // 📈 Tendance mensuelle
    new Chart(this.monthlyStatsChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.stats.monthlyLabels || [],
        datasets: [
          {
            label: 'Arrivées',
            data: this.stats.monthlyArrivees || [],
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Départs',
            data: this.stats.monthlyDeparts || [],
            borderColor: '#f472b6',
            backgroundColor: '#f472b6',
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
            max: 100,
            ticks: { stepSize: 10 }
          }
        }
      }
    });

    // 🔐 Confidentialité (Donut)
    const conf = this.stats.confidentialiteCounts || {};
    const labels = Object.keys(conf);
    const values = Object.values(conf);

    // Couleurs mappées par label (ordre important)
    const colorMap: Record<string, string> = {
      CONFIDENTIEL: '#3b82f6', // bleu
      SECRET: '#1e40af',      
      ROUTINE: '#ec4899'       // rose
    };
    const backgroundColor = labels.map(label => colorMap[label.toUpperCase()] || '#d1d5db');

    new Chart(this.confidentialityChart.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { size: 12 }
            }
          }
        }
      }
    });

    // 📊 Courriers par service
    const serviceData = this.stats.courriersByService || {};
    const serviceLabels = Object.keys(serviceData);
    const arrivees = serviceLabels.map(label => serviceData[label]?.arrivee || 0);
    const departs = serviceLabels.map(label => serviceData[label]?.depart || 0);

    new Chart(this.byServiceChart.nativeElement, {
      type: 'bar',
      data: {
        labels: serviceLabels,
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
          legend: {
            position: 'top'
          }
        }
      }
    });

    // 👥 Courriers par employé
    const employeeData = this.stats.courriersByEmploye || {};
    new Chart(this.byEmployeeChart.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(employeeData),
        datasets: [{
          label: 'Courriers traités',
          data: Object.values(employeeData),
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
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}
