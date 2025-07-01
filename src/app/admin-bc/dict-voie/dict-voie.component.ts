import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { DictionnaireService, VoieExpedition } from '../../services/dictionnaire.service';

@Component({
  selector: 'app-dict-voie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dict-voie.component.html'
})
export class DictVoieComponent implements OnInit, AfterViewInit {
  voies: VoieExpedition[] = [];
  deletedVoies: VoieExpedition[] = [];
  filteredVoies: VoieExpedition[] = [];
  filteredDeletedVoies: VoieExpedition[] = [];

  paginatedVoies: VoieExpedition[] = [];
  paginatedDeletedVoies: VoieExpedition[] = [];

  currentPage = 1;
  deletedPage = 1;
  itemsPerPage = 5;
  itemsPerPageDeleted = 5;
  paginationOptions = [5, 10, 20];

  search = '';
  searchDeleted = '';

  showAddForm = false;
  newVoieName = '';

  showEditModal = false;
  editedVoie: VoieExpedition | null = null;
  editedVoieName: string = '';

  constructor(private dictionnaireService: DictionnaireService) {}

  ngOnInit(): void {
    this.fetchVoies();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newVoieName = '';
    }
  }

  fetchVoies(): void {
    this.dictionnaireService.getAllVoies().subscribe({
      next: data => {
        this.voies = data.filter(v => !v.dateSuppression);
        this.deletedVoies = data.filter(v => v.dateSuppression);
        this.applyFilter();
        this.applyFilterDeleted();
        feather.replace();
      },
      error: () => Swal.fire('Erreur', 'Échec du chargement des voies.', 'error')
    });
  }

  addVoie(): void {
    const nom = this.newVoieName.trim();
    if (!nom) return;

    this.dictionnaireService.addVoie({ nom }).subscribe({
      next: () => {
        Swal.fire('Succès', 'Voie ajoutée avec succès.', 'success');
        this.newVoieName = '';
        this.fetchVoies();
      },
      error: () => Swal.fire('Erreur', 'Impossible d’ajouter cette voie.', 'error')
    });
  }

  openEditModal(voie: VoieExpedition): void {
    this.editedVoie = voie;
    this.editedVoieName = voie.nom;
    this.showEditModal = true;
  }

  saveEditVoie(): void {
    const nom = this.editedVoieName.trim();
    if (!this.editedVoie || !nom) return;

    this.dictionnaireService.updateVoie(this.editedVoie.id, nom).subscribe({
      next: () => {
        Swal.fire('Succès', 'Voie modifiée avec succès.', 'success');
        this.cancelEdit();
        this.fetchVoies();
      },
      error: () => Swal.fire('Erreur', 'Échec de la modification.', 'error')
    });
  }

  cancelEdit(): void {
    this.editedVoie = null;
    this.editedVoieName = '';
    this.showEditModal = false;
  }

  deleteVoie(id: number): void {
    Swal.fire({
      title: 'Supprimer cette voie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.dictionnaireService.deleteVoie(id).subscribe({
          next: () => {
            Swal.fire('Supprimée', 'La voie a été supprimée.', 'success');
            this.fetchVoies();
          },
          error: () => Swal.fire('Erreur', 'Échec de la suppression.', 'error')
        });
      }
    });
  }

  restoreVoie(id: number): void {
    this.dictionnaireService.restoreVoie(id).subscribe({
      next: () => {
        Swal.fire('Restaurée', 'La voie a été restaurée.', 'success');
        this.fetchVoies();
      },
      error: () => Swal.fire('Erreur', 'Échec de la restauration.', 'error')
    });
  }

  applyFilter(): void {
    const term = this.search.toLowerCase();
    this.filteredVoies = this.voies.filter(v => v.nom.toLowerCase().includes(term));
    this.currentPage = 1;
    this.updatePaginatedVoies();
  }

  applyFilterDeleted(): void {
    const term = this.searchDeleted.toLowerCase();
    this.filteredDeletedVoies = this.deletedVoies.filter(v => v.nom.toLowerCase().includes(term));
    this.deletedPage = 1;
    this.updatePaginatedDeletedVoies();
  }

  updatePaginatedVoies(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedVoies = this.filteredVoies.slice(start, start + this.itemsPerPage);
  }

  updatePaginatedDeletedVoies(): void {
    const start = (this.deletedPage - 1) * this.itemsPerPageDeleted;
    this.paginatedDeletedVoies = this.filteredDeletedVoies.slice(start, start + this.itemsPerPageDeleted);
  }

  totalPages(): number {
    return Math.ceil(this.filteredVoies.length / this.itemsPerPage);
  }

  totalDeletedPages(): number {
    return Math.ceil(this.filteredDeletedVoies.length / this.itemsPerPageDeleted);
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePaginatedVoies();
  }

  changeItemsPerPageDeleted(): void {
    this.deletedPage = 1;
    this.updatePaginatedDeletedVoies();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedVoies();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedVoies();
    }
  }

  previousDeletedPage(): void {
    if (this.deletedPage > 1) {
      this.deletedPage--;
      this.updatePaginatedDeletedVoies();
    }
  }

  nextDeletedPage(): void {
    if (this.deletedPage < this.totalDeletedPages()) {
      this.deletedPage++;
      this.updatePaginatedDeletedVoies();
    }
  }
}
