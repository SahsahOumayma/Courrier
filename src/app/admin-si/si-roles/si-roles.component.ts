import { Component, OnInit, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import { SiRoleService, Role } from '../../services/si-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-si-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-roles.component.html',
  styleUrls: ['./si-roles.component.css'],
})
export class SiRolesComponent implements OnInit, AfterViewInit {
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  paginatedRoles: Role[] = [];
  searchTerm: string = '';
  showAddForm: boolean = false;
  newRoleName: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginationOptions: number[] = [5, 10, 20];

  constructor(private siRoleService: SiRoleService) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  fetchRoles(): void {
    this.siRoleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.applyFilter();
      },
      error: (err) => console.error('Erreur chargement rôles', err),
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRoles = this.roles.filter((role) =>
      role.nom.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePaginatedRoles();
  }

  updatePaginatedRoles(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRoles = this.filteredRoles.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
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

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePaginatedRoles();
  }

  deleteRole(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      this.siRoleService.deleteRole(id).subscribe({
        next: () => {
          alert('Rôle supprimé avec succès✅ ');
          this.fetchRoles();
        },
        error: (err) => {
          console.error('Erreur suppression rôle', err);
          alert('Erreur lors de la suppression du rôle.');
        },
      });
    }
  }

  addRole(): void {
    const nom = this.newRoleName.trim();
    if (!nom) return;

    const newRole: Role = { id: 0, nom };

    this.siRoleService.createRole(newRole).subscribe({
      next: () => {
        this.newRoleName = '';
        this.showAddForm = false;
        this.fetchRoles();
      },
      error: (err) => console.error('Erreur ajout rôle', err),
    });
  }
}
