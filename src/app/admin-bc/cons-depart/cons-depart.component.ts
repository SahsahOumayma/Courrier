import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsCourrierService } from '../../services/cons-courrier.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-cons-depart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cons-depart.component.html',
  styleUrls: ['./cons-depart.component.css'],
})
export class ConsDepartComponent implements OnInit, AfterViewInit {
  enCours: any[] = [];
  archives: any[] = [];

  constructor(private courrierService: ConsCourrierService) {}

  ngOnInit(): void {
    this.courrierService.getCourriersDepart().subscribe({
      next: (data: any) => {
        const allCourriers = data.courriers || [];
        this.enCours = allCourriers.filter((c: any) => !c.archiver);
        this.archives = allCourriers.filter((c: any) => c.archiver);
      },
      error: (err) => {
        console.error('Erreur de chargement des courriers départ :', err);
      },
    });
  }

  traiterCourrier(index: number): void {
    const courrier = this.enCours[index];
    courrier.archiver = true;
    this.archives.push(courrier);
    this.enCours.splice(index, 1);
  }

  ngAfterViewInit(): void {
    feather.replace();
  }
}
