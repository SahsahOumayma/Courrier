import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-archives',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './archives.component.html',
})
export class ArchivesComponent {
  recherche = '';
  filtreStatut = 'tous';
  filtreTri = 'aucun';

  pageSize = 5;
  currentPage = 1;
  pageOptions = [5, 10, 15, 20];

  employes = [
    {
      objet: 'Demande de congé',
      employe: 'Hassan El Amrani',
      matricule: 'EMP123',
      cin: 'AB123456',
      service: 'RH',
      dateArchivage: '2025-05-12',
      statut: 'Traité'
    },
    {
      objet: 'Lettre de recommandation',
      employe: 'Fatima Zahra L.',
      matricule: 'EMP456',
      cin: 'CD789012',
      service: 'RH',
      dateArchivage: '2025-05-10',
      statut: 'En cours'
    },
    {
      objet: 'Contrat de travail',
      employe: 'Karim Ben Ali',
      matricule: 'EMP789',
      cin: 'EF345678',
      service: 'RH',
      dateArchivage: '2025-05-08',
      statut: 'Traité'
    }
    // Ajoute d'autres employés ici si tu veux tester la pagination
  ];

  get employesFiltres() {
    let resultat = [...this.employes];

    if (this.recherche.trim()) {
      const terme = this.recherche.toLowerCase();
      resultat = resultat.filter(e =>
        e.objet.toLowerCase().includes(terme) ||
        e.employe.toLowerCase().includes(terme) ||
        e.matricule.toLowerCase().includes(terme) ||
        e.cin.toLowerCase().includes(terme)
      );
    }

    if (this.filtreStatut !== 'tous') {
      resultat = resultat.filter(e => e.statut === this.filtreStatut);
    }

    if (this.filtreTri === 'date') {
      resultat.sort((a, b) => b.dateArchivage.localeCompare(a.dateArchivage));
    } else if (this.filtreTri === 'alphabetique') {
      resultat.sort((a, b) => a.objet.localeCompare(b.objet));
    }

    return resultat;
  }

  get totalPages(): number {
    return Math.ceil(this.employesFiltres.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedEmployes() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employesFiltres.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  onPageSizeChange(size: number) {
    this.currentPage = 1;
  }

  voirDetails(employe: any) {
    alert(`Voir détails : ${employe.objet}`);
  }

  telechargerPDF(employe: any) {
    alert(`Téléchargement PDF : ${employe.objet}`);
  }
}
