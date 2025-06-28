import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvcArrivService } from '../../services/svc-arriv.service';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-svc-arrivee',
  standalone: true,
  templateUrl: './svc-arrivee.component.html',
  styleUrls: ['./svc-arrivee.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SvcArriveeComponent implements OnInit, AfterViewInit {
  courriers: any[] = [];
  courriersFiltres: any[] = [];

  searchTerm: string = '';
  filtreStatut: string = '';

  itemsPerPageOptions = [5, 10, 20];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  loading: boolean = false;

  // Pour la modification du statut
  showStatutModal: boolean = false;
  courrierSelectionne: any = null;
  nouveauStatut: string = '';
  listeStatuts: string[] = [];

  constructor(private svcArrivService: SvcArrivService) {}

  ngOnInit(): void {
    this.chargerCourriers();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  chargerCourriers(): void {
    this.loading = true;
    this.svcArrivService.getArriveeEnCours().subscribe({
      next: (data) => {
        this.courriers = data;
        this.filtrerCourriers();
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

    this.courriersFiltres = this.courriers.filter(c => {
      const matchSearch =
        (c.objet && c.objet.toLowerCase().includes(query)) ||
        (c.signataire && c.signataire.toLowerCase().includes(query)) ||
        (c.urgence?.nom && c.urgence.nom.toLowerCase().includes(query));

      const matchStatut = this.filtreStatut
        ? c.statutCourrier === this.filtreStatut
        : true;

      return matchSearch && matchStatut;
    });

    this.currentPage = 1;
  }

  get courriersPagines(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.courriersFiltres.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.courriersFiltres.length / this.itemsPerPage);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
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

  ouvrirModaleStatut(courrier: any): void {
    this.courrierSelectionne = courrier;
    this.nouveauStatut = '';
    this.listeStatuts = courrier.statusCourrierList || [];
    this.showStatutModal = true;
  }

  fermerModaleStatut(): void {
    this.showStatutModal = false;
    this.courrierSelectionne = null;
    this.nouveauStatut = '';
    this.listeStatuts = [];
  }

  confirmerModificationStatut(): void {
    if (!this.nouveauStatut || !this.courrierSelectionne) return;

    this.loading = true;

    this.svcArrivService.updateStatutCourrier({
      courrierId: this.courrierSelectionne.id,
      newStatus: this.nouveauStatut
    }).subscribe({
      next: (res: any) => {
        Swal.fire('Succès', res.message || 'Statut mis à jour.', 'success');
        this.fermerModaleStatut();
        this.chargerCourriers();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Impossible de modifier le statut.', 'error');
        this.loading = false;
      }
    });
  }
}
