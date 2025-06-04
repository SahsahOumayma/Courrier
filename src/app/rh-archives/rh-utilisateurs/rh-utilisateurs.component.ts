import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { RhArchiveService, EmployeeListDTO } from '../../services/rh-archive.service';

@Component({
  selector: 'app-rh-utilisateurs',
  standalone: true,
  templateUrl: './rh-utilisateurs.component.html',
  imports: [CommonModule, FormsModule]
})
export class RhUtilisateursComponent implements OnInit {
  utilisateurs: EmployeeListDTO[] = [];
  filtreRole: string = 'tous';
  filtreStatut: string = 'tous';
  recherche: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  pageOptions: number[] = [5, 10, 15];

  rolesDisponibles: string[] = ['ADMINBC', 'ADMINISI', 'DELEGUE', 'RH', 'RESPONSABLESVC'];

  constructor(private rhService: RhArchiveService) {}

  ngOnInit(): void {
    this.rhService.getAllEmployees().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur chargement RH :', err)
    });
  }

  get utilisateursFiltres(): EmployeeListDTO[] {
    return this.utilisateurs.filter(user =>
      (this.filtreRole === 'tous' || user.role === this.filtreRole) &&
      (this.filtreStatut === 'tous' || (this.filtreStatut === 'actif' ? user.active : !user.active)) &&
      (
        user.fullName.toLowerCase().includes(this.recherche.toLowerCase()) ||
        user.email.toLowerCase().includes(this.recherche.toLowerCase()) ||
        user.login.toLowerCase().includes(this.recherche.toLowerCase())
      )
    );
  }

  get totalPages(): number {
    return Math.ceil(this.utilisateursFiltres.length / this.pageSize) || 1;
  }

  get paginatedUtilisateurs(): EmployeeListDTO[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.utilisateursFiltres.slice(start, start + this.pageSize);
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

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
