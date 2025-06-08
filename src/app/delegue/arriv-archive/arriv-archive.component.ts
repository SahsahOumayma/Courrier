import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArriveeDelService } from '../../services/arrivee-del.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-arriv-archive',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './arriv-archive.component.html',
  styleUrls: ['./arriv-archive.component.css'],
})
export class ArrivArchiveComponent implements OnInit, AfterViewChecked {
  courriers: any[] = [];
  paginatedCourriers: any[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  pageOptions: number[] = [5, 10, 20];
  totalPages: number = 1;

  termeRecherche: string = '';
  filtreStatut: string = 'tous';
  selectedTri: string = 'default';

  constructor(private arriveeService: ArriveeDelService) {}

  ngOnInit(): void {
    this.arriveeService.getAll().subscribe((data: any[]) => {
      this.courriers = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    // ✅ Filtrer uniquement les courriers archivés
    let filtered = this.courriers.filter(c => c.archiver === true);

    // ✅ Filtrer par statut si nécessaire
    if (this.filtreStatut !== 'tous') {
      filtered = filtered.filter(c =>
        c.statutCourrier &&
        c.statutCourrier.trim().toUpperCase().replace(/\s+/g, '_') === this.filtreStatut.toUpperCase()
      );
    }

    // ✅ Recherche texte
    if (this.termeRecherche.trim() !== '') {
      const term = this.termeRecherche.toLowerCase();
      filtered = filtered.filter(c =>
        (c.object && c.object.toLowerCase().includes(term)) ||
        (c.description && c.description.toLowerCase().includes(term)) ||
        (c.numeroRegistre && c.numeroRegistre.toString().includes(term)) ||
        (c.signataire && c.signataire.toLowerCase().includes(term))
      );
    }

    // ✅ Tri
    if (this.selectedTri === 'alphabetique') {
      filtered.sort((a, b) => (a.object || '').localeCompare(b.object || ''));
    } else if (this.selectedTri === 'urgence') {
      const ordreUrgence: Record<string, number> = {
        FLASH: 1,
        URGENT: 2,
        NORMAL: 3,
        MOINS_URGENT: 4
      };
      filtered.sort((a, b) =>
        (ordreUrgence[a.urgence?.toUpperCase()] || 99) -
        (ordreUrgence[b.urgence?.toUpperCase()] || 99)
      );
    } else {
      filtered.sort((a, b) =>
        new Date(b.dateArrive).getTime() - new Date(a.dateArrive).getTime()
      );
    }

    // ✅ Pagination
    this.totalPages = Math.max(Math.ceil(filtered.length / this.pageSize), 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCourriers = filtered.slice(start, end);
  }

  trierCourriers(): void {
    this.updatePagination();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
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

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
