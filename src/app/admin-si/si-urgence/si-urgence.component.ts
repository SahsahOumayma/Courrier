import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiUrgenceService, Urgence } from '../../services/si-urgence.service';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-si-urgence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-urgence.component.html',
  styleUrls: ['./si-urgence.component.css']
})
export class SiUrgenceComponent implements OnInit, AfterViewInit {
  urgences: Urgence[] = [];
  urgencesSupp: Urgence[] = [];

  filteredUrgences: Urgence[] = [];
  filteredUrgencesSupp: Urgence[] = [];

  newUrgenceName = '';
  editedUrgenceName = '';
  selectedUrgenceId: number | null = null;
  showAddForm = false;
  showEditModal = false;

  searchTerm = '';
  searchSupp = '';

  currentPage = 1;
  itemsPerPage = 5;
  currentPageSupp = 1;
  itemsPerPageSupp = 5;
  paginationOptions = [5, 10, 20];

  private urgenceService = inject(SiUrgenceService);

  ngOnInit(): void {
    this.loadUrgences();
  }

  ngAfterViewInit(): void {
    feather.replace();
    const observer = new MutationObserver(() => feather.replace());
  observer.observe(document.body, { childList: true, subtree: true });
  }

  loadUrgences(): void {
    this.urgenceService.getAll().subscribe({
      next: data => {
        this.urgences = data.filter(u => !u.dateSuppression);
        this.urgencesSupp = data.filter(u => !!u.dateSuppression);
        this.applyFilter();
        this.applyFilterSupp();
      },
      error: err => console.error('Erreur chargement urgences', err)
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUrgences = this.urgences.filter(u => u.nom.toLowerCase().includes(term));
    this.currentPage = 1;
  }

  applyFilterSupp(): void {
    const term = this.searchSupp.toLowerCase().trim();
    this.filteredUrgencesSupp = this.urgencesSupp.filter(u => u.nom.toLowerCase().includes(term));
    this.currentPageSupp = 1;
  }

  get paginatedUrgences(): Urgence[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUrgences.slice(start, start + this.itemsPerPage);
  }

  get paginatedUrgencesSupp(): Urgence[] {
    const start = (this.currentPageSupp - 1) * this.itemsPerPageSupp;
    return this.filteredUrgencesSupp.slice(start, start + this.itemsPerPageSupp);
  }

  totalPages(): number {
    return Math.ceil(this.filteredUrgences.length / this.itemsPerPage);
  }

  totalPagesSupp(): number {
    return Math.ceil(this.filteredUrgencesSupp.length / this.itemsPerPageSupp);
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

  changeItemsPerPage(): void {
    this.applyFilter();
  }

  changeItemsPerPageSupp(): void {
    this.applyFilterSupp();
  }

  addUrgence(): void {
    const payload = { nom: this.newUrgenceName };
    this.urgenceService.create(payload).subscribe({
      next: () => {
        this.newUrgenceName = '';
        this.showAddForm = false;
        this.loadUrgences();
        Swal.fire('✅ Succès', 'Urgence ajoutée.', 'success');
      },
      error: () => Swal.fire('❌ Erreur', 'Échec de l’ajout.', 'error')
    });
  }

  deleteUrgence(id: number): void {
    Swal.fire({
      title: 'Supprimer ?',
      text: 'Cette urgence sera déplacée dans l’historique.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.urgenceService.delete(id).subscribe({
          next: () => {
            this.loadUrgences();
            Swal.fire('✅ Supprimé', 'Déplacée dans l’historique.', 'success');
          },
          error: () => Swal.fire('❌ Erreur', 'Échec de la suppression.', 'error')
        });
      }
    });
  }

  openEditModal(urgence: Urgence): void {
    this.selectedUrgenceId = urgence.id;
    this.editedUrgenceName = urgence.nom;
    this.showEditModal = true;
  }

  cancelEdit(): void {
    this.showEditModal = false;
    this.selectedUrgenceId = null;
    this.editedUrgenceName = '';
  }

  saveEditUrgence(): void {
    if (!this.selectedUrgenceId || !this.editedUrgenceName.trim()) return;
    const updated: Urgence = {
      id: this.selectedUrgenceId,
      nom: this.editedUrgenceName
    };
    this.urgenceService.update(updated).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadUrgences();
        Swal.fire('✅ Modifié', 'Urgence modifiée.', 'success');
      },
      error: () => Swal.fire('❌ Erreur', 'Échec de la modification.', 'error')
    });
  }

  restoreUrgence(id: number): void {
    Swal.fire({
      title: 'Restaurer ?',
      text: 'Cette urgence sera réactivée.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, restaurer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.urgenceService.restore(id).subscribe({
          next: () => {
            this.loadUrgences();
            Swal.fire('✅ Restaurée', 'Urgence restaurée.', 'success');
          },
          error: () => Swal.fire('❌ Erreur', 'Échec de la restauration.', 'error')
        });
      }
    });
  }
}
