// src/app/components/archives/archives.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { RhArchiveService, CourrierEmployeeDTO } from '../../services/rh-archive.service';

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './archives.component.html',
})
export class ArchivesComponent implements OnInit {
  recherche = '';
  filtreStatut = 'tous';
  filtreTri = 'aucun';
  pageSize = 5;
  currentPage = 1;
  pageOptions = [5, 10, 15, 20];

  employes: CourrierEmployeeDTO[] = [];

  constructor(private rhArchiveService: RhArchiveService) {}

  ngOnInit(): void {
    this.rhArchiveService.getArchivedCourriers().subscribe({
      next: (data) => {
        console.log('✅ Données reçues :', data);
        this.employes = data;
      },
      error: (err) => {
        console.error('❌ Erreur API :', err);
      }
    });
  }

  get employesFiltres(): CourrierEmployeeDTO[] {
    let resultat = [...this.employes];

    if (this.recherche.trim()) {
      const terme = this.recherche.toLowerCase();
      resultat = resultat.filter((e) =>
        e.objet.toLowerCase().includes(terme) ||
        e.employe.toLowerCase().includes(terme) ||
        e.matricule.toLowerCase().includes(terme) ||
        e.cin.toLowerCase().includes(terme)
      );
    }

    if (this.filtreStatut !== 'tous') {
      resultat = resultat.filter((e) =>
        e.statut.trim().toLowerCase() === this.filtreStatut.toLowerCase()
      );
    }

    if (this.filtreTri === 'date') {
      resultat.sort((a, b) => b.dateArchivage.localeCompare(a.dateArchivage));
    } else if (this.filtreTri === 'alphabetique') {
      resultat.sort((a, b) => a.objet.localeCompare(b.objet));
    }

    return resultat;
  }

  get paginatedEmployes(): CourrierEmployeeDTO[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employesFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.employesFiltres.length / this.pageSize) || 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
  }

  voirDetails(employe: CourrierEmployeeDTO): void {
    window.open(`/api/courriers/${employe.courrierId}/view-pdf`, '_blank');
  }

  telechargerPDF(employe: CourrierEmployeeDTO): void {
    window.open(employe.downloadUrl, '_blank');
  }
   ngAfterViewChecked(): void {
      feather.replace();
    }
}
