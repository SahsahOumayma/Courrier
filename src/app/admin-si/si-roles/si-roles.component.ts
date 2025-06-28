import { Component, OnInit, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import { SiRoleService, Role } from '../../services/si-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-si-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-roles.component.html',
  styleUrls: ['./si-roles.component.css'],
})
export class SiRolesComponent implements OnInit, AfterViewInit {
  roles: Role[] = [];
  deletedRoles: Role[] = [];

  filteredRoles: Role[] = [];
  filteredDeleted: Role[] = [];

  paginatedRoles: Role[] = [];
  paginatedDeleted: Role[] = [];

  currentPage = 1;
  deletedPage = 1;
  itemsPerPage = 5;
  itemsPerPageDeleted = 5;
  paginationOptions: number[] = [5, 10, 20];

  searchTerm = '';
  searchDeleted = '';

  showAddForm = false;
  newRoleName = '';
  editingRole: Role | null = null;
  showEditModal = false;

  constructor(private siRoleService: SiRoleService) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggleAddForm(): void {
    if (this.showAddForm && !this.editingRole) {
      this.resetForm();
    } else {
      this.showAddForm = !this.showAddForm;
    }
  }

  resetForm(): void {
    this.newRoleName = '';
    this.editingRole = null;
    this.showAddForm = false;
    this.showEditModal = false;
  }

  addOrEditRole(): void {
    const nom = this.newRoleName.trim();
    if (!nom) return;

    if (this.editingRole) {
      // Modification
      this.siRoleService.updateRole({ ...this.editingRole, nom }).subscribe({
        next: () => {
          Swal.fire('Succès', 'Rôle modifié avec succès.', 'success');
          this.resetForm();
          this.fetchRoles();
        },
        error: () => Swal.fire('Erreur', 'Échec de la modification.', 'error')
      });
    } else {
      // Ajout
      this.siRoleService.createRole({ nom }).subscribe({
        next: () => {
          Swal.fire('Succès', 'Rôle ajouté avec succès.', 'success');
          this.resetForm();
          this.fetchRoles();
        },
        error: () => Swal.fire('Erreur', 'Impossible d’ajouter ce rôle.', 'error')
      });
    }
  }

  editRole(role: Role): void {
    this.editingRole = { ...role };
    this.newRoleName = role.nom;
    this.showEditModal = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  saveRole(): void {
    if (!this.editingRole) return;
    const nom = this.newRoleName.trim();
    if (!nom) return;

    this.siRoleService.updateRole({ ...this.editingRole, nom }).subscribe({
      next: () => {
        Swal.fire('Succès', 'Rôle modifié avec succès.', 'success');
        this.resetForm();
        this.fetchRoles();
      },
      error: () => Swal.fire('Erreur', 'Échec de la modification.', 'error')
    });
  }

  deleteRole(id: number): void {
    Swal.fire({
      title: 'Supprimer ce rôle ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then(result => {
      if (result.isConfirmed) {
        this.siRoleService.deleteRole(id).subscribe({
          next: () => {
            Swal.fire('Supprimé', 'Le rôle a été supprimé.', 'success');
            this.fetchRoles();
          },
          error: () => Swal.fire('Erreur', 'Suppression échouée.', 'error')
        });
      }
    });
  }

  restoreRole(id: number): void {
    this.siRoleService.restoreRole(id).subscribe({
      next: () => {
        Swal.fire('Restauré', 'Le rôle a été restauré.', 'success');
        this.fetchRoles();
      },
      error: () => Swal.fire('Erreur', 'Échec de la restauration.', 'error')
    });
  }

  fetchRoles(): void {
    this.siRoleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data.filter(r => !r.dateSuppression);
        this.deletedRoles = data.filter(r => r.dateSuppression);
        this.applyFilter();
        this.applyFilterDeleted();
      },
      error: err => {
        Swal.fire('Erreur', 'Erreur lors du chargement des rôles', 'error');
        console.error(err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRoles = this.roles.filter(r => r.nom.toLowerCase().includes(term));
    this.currentPage = 1;
    this.updatePaginatedRoles();
  }

  applyFilterDeleted(): void {
    const term = this.searchDeleted.toLowerCase();
    this.filteredDeleted = this.deletedRoles.filter(r => r.nom.toLowerCase().includes(term));
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  updatePaginatedRoles(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRoles = this.filteredRoles.slice(start, start + this.itemsPerPage);
  }

  updatePaginatedDeleted(): void {
    const start = (this.deletedPage - 1) * this.itemsPerPageDeleted;
    this.paginatedDeleted = this.filteredDeleted.slice(start, start + this.itemsPerPageDeleted);
  }

  totalPages(): number {
    return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
  }

  totalDeletedPages(): number {
    return Math.ceil(this.filteredDeleted.length / this.itemsPerPageDeleted);
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePaginatedRoles();
  }

  changeItemsPerPageDeleted(): void {
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRoles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedRoles();
    }
  }

  previousDeletedPage(): void {
    if (this.deletedPage > 1) {
      this.deletedPage--;
      this.updatePaginatedDeleted();
    }
  }

  nextDeletedPage(): void {
    if (this.deletedPage < this.totalDeletedPages()) {
      this.deletedPage++;
      this.updatePaginatedDeleted();
    }
  }
}
