import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiConfidService, Confidentialite } from '../../services/si-confid.service';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-si-confid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-confid.component.html',
  styleUrls: ['./si-confid.component.css'],
})
export class SiConfidComponent implements OnInit, AfterViewInit {
  confidentialites: Confidentialite[] = [];
  historiques: Confidentialite[] = [];

  filteredConfids: Confidentialite[] = [];
  filteredHistoriques: Confidentialite[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  currentPageSupp = 1;
  itemsPerPageSupp = 5;

  searchTerm: string = '';
  searchSupp: string = '';

  showAddForm = false;
  newConfidName: string = '';

  editingId: number | null = null;
  editedName: string = '';

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
        this.confidentialites = data.filter(c => !c.dateSuppression);
        this.historiques = data.filter(c => !!c.dateSuppression);
        this.applyFilter();
        this.applyFilterSupp();
      },
      error: (err) => console.error('Erreur chargement des niveaux :', err),
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredConfids = this.confidentialites.filter(c =>
      c.nom.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  applyFilterSupp(): void {
    const term = this.searchSupp.toLowerCase().trim();
    this.filteredHistoriques = this.historiques.filter(c =>
      c.nom.toLowerCase().includes(term)
    );
    this.currentPageSupp = 1;
  }

  get paginatedConfids(): Confidentialite[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConfids.slice(start, start + this.itemsPerPage);
  }

  get paginatedConfidsSupp(): Confidentialite[] {
    const start = (this.currentPageSupp - 1) * this.itemsPerPageSupp;
    return this.filteredHistoriques.slice(start, start + this.itemsPerPageSupp);
  }

  totalPages(): number {
    return Math.ceil(this.filteredConfids.length / this.itemsPerPage);
  }

  totalPagesSupp(): number {
    return Math.ceil(this.filteredHistoriques.length / this.itemsPerPageSupp);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  previousPageSupp(): void {
    if (this.currentPageSupp > 1) this.currentPageSupp--;
  }

  nextPageSupp(): void {
    if (this.currentPageSupp < this.totalPagesSupp()) this.currentPageSupp++;
  }

  addConfidentialite(): void {
    const payload = {
      nom: this.newConfidName,
      code: '',
      dateSuppression: undefined
    };

    this.siConfidService.create(payload).subscribe({
      next: () => {
        this.newConfidName = '';
        this.showAddForm = false;
        this.loadConfidentialites();
        Swal.fire('✅ Succès', 'Confidentialité ajoutée.', 'success');
      },
      error: () => {
        Swal.fire('❌ Erreur', 'Échec de l’ajout.', 'error');
      }
    });
  }

  deleteConfidentialite(id: number): void {
    Swal.fire({
      title: 'Supprimer ?',
      text: 'Cette confidentialité sera déplacée dans l’historique.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.siConfidService.delete(id).subscribe({
          next: () => {
            this.loadConfidentialites();
            Swal.fire('✅ Supprimé', 'Déplacé dans l’historique.', 'success');
          },
          error: () => {
            Swal.fire('❌ Erreur', 'Échec de la suppression.', 'error');
          }
        });
      }
    });
  }

  restaurerConfidentialite(id: number): void {
    Swal.fire({
      title: 'Restaurer ?',
      text: 'Cette confidentialité sera réactivée.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, restaurer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.siConfidService.restore(id).subscribe({
          next: () => {
            this.loadConfidentialites();
            Swal.fire('✅ Restauré', 'La confidentialité a été restaurée.', 'success');
          },
          error: () => {
            Swal.fire('❌ Erreur', 'Échec de la restauration.', 'error');
          }
        });
      }
    });
  }

  editConfidentialite(c: Confidentialite): void {
    this.editingId = c.id;
    this.editedName = c.nom;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editedName = '';
  }

  confirmEdit(): void {
    if (!this.editedName.trim()) return;

    const updated: Confidentialite = {
      id: this.editingId!,
      nom: this.editedName,
      code: '',
      dateSuppression: undefined
    };

    this.siConfidService.update(updated).subscribe({
      next: () => {
        this.editingId = null;
        this.editedName = '';
        this.loadConfidentialites();
        Swal.fire('✅ Modifié', 'Niveau mis à jour.', 'success');
      },
      error: () => {
        Swal.fire('❌ Erreur', 'Échec de la modification.', 'error');
      }
    });
  }
}
