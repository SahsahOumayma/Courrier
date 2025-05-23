import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
declare const feather: any;

@Component({
  selector: 'app-bc-statistique',
  templateUrl: './bc-statistique.component.html',
  styleUrls: ['./bc-statistique.component.css']
})
export class BcStatistiqueComponent implements AfterViewInit {
  @ViewChild('monthlyStatsChart') monthlyStatsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('confidentialityChart') confidentialityChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byServiceChart') byServiceChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('byEmployeeChart') byEmployeeChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    feather.replace();

    new Chart(this.monthlyStatsChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul'],
        datasets: [
          { label: 'Arrivées', data: [30,45,28,50,60,55,70], fill: false, tension: 0.4 },
          { label: 'Départs',  data: [25,35,22,40,50,45,60], fill: false, tension: 0.4 }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    new Chart(this.confidentialityChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Moins secret','Routine','Secret'],
        datasets: [{ data: [30,50,20] }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } } }
    });

    new Chart(this.byServiceChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['RH','Finance','IT','Logistique','Médicaments','Admin'],
        datasets: [
          { label: 'Arrivées', data: [12,8,15,5,20,7] },
          { label: 'Départs',  data: [7,5,10,3,12,4] }
        ]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    new Chart(this.byEmployeeChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Alice','Bob','Karim','Sofia','Youssef'],
        datasets: [{ label: 'Courriers traités', data: [15,12,9,8,5] }]
      },
      options: { indexAxis: 'y', responsive: true, scales: { x: { beginAtZero: true } } }
    });
  }
}