import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArriveeDelService } from '../../services/arrivee-del.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-arrivee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './arrivee.component.html',
  styleUrls: ['./arrivee.component.css'],
})
export class ArriveeComponent implements OnInit {
  courriers: any[] = [];
  paginatedCourriers: any[] = [];

  currentPage = 1;
  pageSize = 5;
  pageOptions = [5, 10, 20];
  totalPages = 1;

  termeRecherche = '';
  filtreStatut = 'tous';
  selectedTri = 'default';

  constructor(private arriveeService: ArriveeDelService) {}

  ngOnInit(): void {
    this.arriveeService.getAll().subscribe((data: any[]) => {
      this.courriers = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    let filtered = this.courriers;

    // --- Filtrage par statut ---
    if (this.filtreStatut !== 'tous') {
      filtered = filtered.filter(
        (c) =>
          c.statutCourrier?.toLowerCase() === this.filtreStatut.toLowerCase()
      );
    }

    // --- Recherche ---
    if (this.termeRecherche.trim() !== '') {
      const term = this.termeRecherche.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.object?.toLowerCase().includes(term) ||
          c.description?.toLowerCase().includes(term) ||
          c.numeroRegistre?.toString().includes(term) ||
          c.signataire?.toLowerCase().includes(term)
      );
    }

    // --- Tri par défaut = date d'arrivée ---
    if (this.selectedTri === 'date' || this.selectedTri === 'default') {
      filtered.sort(
        (a, b) =>
          new Date(b.dateArrive).getTime() - new Date(a.dateArrive).getTime()
      );
    }

    // --- Tri alphabétique (par objet) ---
    else if (this.selectedTri === 'alphabetique') {
      filtered.sort((a, b) => (a.object || '').localeCompare(b.object || ''));
    }

    // --- Tri par urgence ---
    else if (this.selectedTri === 'urgence') {
      const ordreUrgence: Record<string, number> = {
        URGENT: 1,
        NORMAL: 2,
        MOINS_URGENT: 3,
      };

      filtered.sort(
        (a, b) =>
          (ordreUrgence[a.urgence as keyof typeof ordreUrgence] || 99) -
          (ordreUrgence[b.urgence as keyof typeof ordreUrgence] || 99)
      );
    }

    // --- Pagination ---
    this.totalPages = Math.max(Math.ceil(filtered.length / this.pageSize), 1);
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedCourriers = filtered.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  trierCourriers(): void {
    this.updatePagination();
  }

  telechargerPDF(courrier: any): void {
    if (courrier.attachment_path) {
      const a = document.createElement('a');
      a.href = `http://localhost:9090${courrier.attachment_path}`;
      a.download = courrier.attachment_path.split('/').pop();
      a.click();
    } else {
      alert('Aucun fichier attaché à ce courrier.');
    }
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
