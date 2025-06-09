import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cons-employe',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cons-employe.component.html',
  styleUrls: ['./cons-employe.component.css']
})
export class ConsEmployeComponent implements OnInit {
  employes: any[] = [];
  urgences: any[] = [];
  confidentialites: any[] = [];
  services: any[] = [];

  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:9090/api/admin-bc/courrier/employe').subscribe({
      next: data => {
        this.employes = data.employes;
        this.urgences = data.urgences;
        this.confidentialites = data.confidentialites;
        this.services = data.services;
        this.isLoading = false;
      },
      error: err => {
        console.error('Erreur lors de la récupération des données:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
