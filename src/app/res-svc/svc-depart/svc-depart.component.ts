import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ À ajouter
import { FormsModule } from '@angular/forms';
import { SvcArrivService } from '../../services/svc-arriv.service'; 
import feather from 'feather-icons';

@Component({
  selector: 'app-svc-depart',
  standalone: true, // ✅ Standalone doit déclarer les imports
  imports: [CommonModule, FormsModule], // ✅ Ajoute CommonModule ici
  templateUrl: './svc-depart.component.html',
  styleUrls: ['./svc-depart.component.css']
})
export class SvcDepartComponent implements OnInit {
  courriers: any[] = [];
  courriersFiltres: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private svcArrivService: SvcArrivService) {}

  ngOnInit(): void {
    this.chargerCourriers();
  }

  chargerCourriers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.svcArrivService.getDepartEnCours().subscribe({
      next: (data) => {
        this.courriers = data;
        this.courriersFiltres = [...this.courriers];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des courriers :', error);
        this.errorMessage = '';
        this.loading = false;
      }
    });
  }

  filtrerCourriers(): void {
    const query = this.searchTerm.trim().toLowerCase();
    this.courriersFiltres = this.courriers.filter(c =>
      (c.objet && c.objet.toLowerCase().includes(query)) ||
      (c.signataire && c.signataire.toLowerCase().includes(query)) ||
      (c.urgence && c.urgence.toLowerCase().includes(query))
    );
  }

 voirPDF(courrierId: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${courrierId}/view-pdf`;
  window.open(url, '_blank');
}

telechargerPDF(courrierId: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${courrierId}/download`;
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

archiver(id: number): void {
  if (!confirm('Voulez-vous archiver ce courrier ?')) return;
  this.loading = true;
  this.svcArrivService.updateStatutCourrier({
    courrierId: id,
    newStatus: 'TRAITE'
  }).subscribe({
    next: () => {
      this.courriers = this.courriers.filter(c => c.id !== id);
      this.filtrerCourriers();
      this.loading = false;
    },
    error: () => {
      this.errorMessage = '';
      this.loading = false;
    }
  });
}

 ngAfterViewInit(): void {
      feather.replace();
  
}
}
