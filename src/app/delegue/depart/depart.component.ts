import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DepartDelService } from '../../services/depart-del.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-depart',
  standalone: true,
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DepartComponent implements OnInit, AfterViewChecked {
  courriers: any[] = [];
  paginatedCourriers: any[] = [];

  // Filtres
  filterText: string = '';
  filtreVoie: string = ''; // ✅ Nouveau filtre par voie
  selectedTri: string = 'default';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  pageOptions: number[] = [5, 10, 20];
  totalPages: number = 1;

  // ✅ Liste des voies disponibles (remplie dynamiquement)
  voiesDisponibles: string[] = [];

  constructor(private departService: DepartDelService) {}

  ngOnInit(): void {
    this.departService.getDepartCourriers().subscribe(data => {
      this.courriers = data.filter(c => !c.archiver); // Non archivés uniquement

      // ✅ Extraire les voies disponibles uniques
      this.voiesDisponibles = [...new Set(this.courriers
        .map(c => c.voieExpedition)
        .filter(v => !!v))];

      this.updatePagination();
    });
  }

  updatePagination(): void {
    let filtered = [...this.courriers];

    // ✅ Filtrer par voie
    if (this.filtreVoie !== '') {
      filtered = filtered.filter(c =>
        c.voieExpedition?.toLowerCase() === this.filtreVoie.toLowerCase()
      );
    }

    // 🔍 Filtrer par texte
    const txt = this.filterText.toLowerCase().trim();
    if (txt) {
      filtered = filtered.filter(c =>
        [c.object, c.nomExpediteur, c.dateDepart, c.service, c.voieExpedition, c.nature, c.urgence, c.description]
          .some(field => field?.toString().toLowerCase().includes(txt))
      );
    }

    // 🔃 Tri
    if (this.selectedTri === 'alphabetique') {
      filtered.sort((a, b) => (a.object || '').localeCompare(b.object || ''));
    } else if (this.selectedTri === 'urgence') {
      const ordre: { [key: string]: number } = { FLASH: 1, URGENT: 2, NORMAL: 3 };
      filtered.sort((a, b) => (ordre[a.urgence] ?? 99) - (ordre[b.urgence] ?? 99));
    } else {
      filtered.sort((a, b) => new Date(b.dateDepart).getTime() - new Date(a.dateDepart).getTime());
    }

    // 📄 Pagination
    this.totalPages = Math.max(Math.ceil(filtered.length / this.pageSize), 1);
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedCourriers = filtered.slice(start, start + this.pageSize);
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

  trierCourriers(): void {
    this.currentPage = 1;
    this.updatePagination();
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
