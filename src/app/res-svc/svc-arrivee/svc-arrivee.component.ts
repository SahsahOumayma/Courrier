import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvcArrivService } from '../../services/svc-arriv.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-svc-arrivee',
  standalone: true,
  templateUrl: './svc-arrivee.component.html',
  styleUrls: ['./svc-arrivee.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SvcArriveeComponent implements OnInit {
  courriers: any[] = [];
  courriersFiltres: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private svcArrivService: SvcArrivService) {}

  ngOnInit(): void {
    this.chargerCourriers();
  }

  chargerCourriers(): void {
    this.loading = true;
    this.svcArrivService.getArriveeEnCours().subscribe({
      next: (data) => {
        this.courriers = data;
        this.courriersFiltres = [...this.courriers];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement :', error);
        this.loading = false;
      }
    });
  }

  filtrerCourriers(): void {
    const query = this.searchTerm.toLowerCase().trim();
    this.courriersFiltres = this.courriers.filter(c =>
      (c.objet && c.objet.toLowerCase().includes(query)) ||
      (c.signataire && c.signataire.toLowerCase().includes(query)) ||
      (c.urgence && c.urgence.toLowerCase().includes(query))
    );
  }

  voirPDF(id: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${id}/view-pdf`;
  window.open(url, '_blank');
}

telechargerPDF(id: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${id}/download`;
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
      this.loading = false;
    }
  });
}

  ngAfterViewInit(): void {
      feather.replace();
  
}
}
