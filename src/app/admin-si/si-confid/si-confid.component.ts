import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { SiConfidService } from '../../services/si-confid.service';

interface Confidentialite {
  id: number;
  nom: string;
  code: string;
}

@Component({
  selector: 'app-si-confid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-confid.component.html',
  styleUrls: ['./si-confid.component.css']
})
export class SiConfidComponent implements OnInit, AfterViewInit {

  confidentialites: Confidentialite[] = [];
  filteredConfidentialites: Confidentialite[] = [];

  newConfidName: string = '';
  showAddForm: boolean = false;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  private siConfidService = inject(SiConfidService);

  ngOnInit(): void {
    this.loadConfidentialites();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadConfidentialites(): void {
    this.siConfidService.getAll().subscribe({
      next: (data) => {
        this.confidentialites = data;
        this.applyFilter();
      },
      error: (err) => console.error('Erreur chargement', err)
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredConfidentialites = this.confidentialites.filter(c =>
      c.nom.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedConfids(): Confidentialite[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConfidentialites.slice(start, start + this.itemsPerPage);
  }

  addConfidentialite(): void {
    if (!this.newConfidName.trim()) return;

    const newItem = {
      nom: this.newConfidName,
      code: '' // code par défaut
    };

    this.siConfidService.create(newItem).subscribe({
      next: () => {
        this.newConfidName = '';
        this.showAddForm = false;
        this.loadConfidentialites();
      },
      error: (err) => console.error('Erreur ajout', err)
    });
  }

  deleteConfidentialite(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette confidentialité ?')) {
    this.siConfidService.delete(id).subscribe({
      next: () => {
        alert('Confidentialité supprimée avec succès ✅');
        this.loadConfidentialites(); // ou `this.fetchConfidentialites()` si tu renommes
      },
      error: err => {
        console.error('Erreur suppression confidentialité', err);
        alert('Erreur lors de la suppression de la confidentialité.');
      }
    });
  }
}


  totalPages(): number {
    return Math.ceil(this.filteredConfidentialites.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }
}
