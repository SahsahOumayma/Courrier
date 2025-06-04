import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DepartDelService } from '../../services/depart-del.service';
import feather from 'feather-icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-depart',
  standalone: true,
  templateUrl: './depart.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DepartComponent implements OnInit, AfterViewChecked {
  courriers: any[] = [];

  // 🔍 Filtres
  filterText = '';
  filterRecepteur = '';
  filtreStatut: string = '';
  selectedTri: string = 'default';

  // 📄 Pagination
  currentPage = 1;
  pageSize = 5;
  pageOptions = [5, 10, 20];

  constructor(private departService: DepartDelService) {}

  ngOnInit(): void {
    this.departService.getDepartCourriers().subscribe(data => {
      this.courriers = data;
    });
  }

  // Destinataires uniques
  get destinataires() {
    return Array.from(new Set(this.courriers.map(c => c.nomExpediteur).filter(Boolean)));
  }

  // 🎯 Filtres appliqués
  get filteredCourriers() {
    return this.courriers.filter(c => {
      if (this.filtreStatut && c.statutCourrier?.toUpperCase() !== this.filtreStatut.toUpperCase()) return false;
      if (this.filterRecepteur && c.nomExpediteur !== this.filterRecepteur) return false;

      const txt = this.filterText.trim().toLowerCase();
      if (txt) {
        const values = [
          c.object,
          c.nomExpediteur,
          c.dateDepart,
          c.statutCourrier,
          c.service,
          c.voieExpedition,
          c.nature,
          c.degreConfiden,
          c.urgence,
          c.description || ''
        ];
        return values.some(val => val?.toLowerCase().includes(txt));
      }

      return true;
    });
  }

  // Pagination
  get totalPages() {
    return Math.ceil(this.filteredCourriers.length / this.pageSize) || 1;
  }

  get paginatedCourriers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCourriers.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  prevPage() {
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  updatePagination() {
    this.currentPage = 1;
  }

  // 📊 Tri
  trierCourriers() {
    if (this.selectedTri === 'alphabetique') {
      this.courriers.sort((a, b) => (a.object || '').localeCompare(b.object || ''));
    } else if (this.selectedTri === 'urgence') {
      const ordre: { [key: string]: number } = { URGENT: 1, NORMAL: 2 };
      this.courriers.sort((a, b) => {
        const valA = ordre[a.urgence] ?? 99;
        const valB = ordre[b.urgence] ?? 99;
        return valA - valB;
      });
    }
    this.currentPage = 1;
  }

  // 📥 Télécharger PDF depuis backend
  telechargerPDF(courrierId: number): void {
    const url = `http://localhost:9090/api/delegue/api/courriers/${courrierId}/download`;
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // 👁️ Voir PDF en ligne
  voirPDF(courrierId: number): void {
    const url = `http://localhost:9090/api/delegue/api/courriers/${courrierId}/view-pdf`;
    window.open(url, '_blank');
  }

  // 🎨 Feather icons
  ngAfterViewChecked(): void {
    feather.replace();
  }
}
