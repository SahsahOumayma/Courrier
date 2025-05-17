import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rh-utilisateurs',
  standalone: true,
  templateUrl: './rh-utilisateurs.component.html',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RhUtilisateursComponent {
  filtreRole = 'tous';
  filtreStatut = 'tous';
  recherche = '';

  pageSize = 5;
  currentPage = 1;
  pageOptions = [5, 10, 15];

  utilisateurs = [
    { nom: 'Ali Mansouri', email: 'ali@chu.ma', role: 'Responsable RH', active: true },
    { nom: 'Yasmine Raji', email: 'yasmine@chu.ma', role: 'Délégué RH', active: false },
    { nom: 'Khalid Bennani', email: 'khalid@chu.ma', role: 'Délégué RH', active: true },
    { nom: 'Nadia Fakir', email: 'nadia@chu.ma', role: 'Responsable RH', active: true },
    { nom: 'Karim Lahlou', email: 'karim@chu.ma', role: 'Délégué RH', active: true },
    { nom: 'Souad Mernissi', email: 'souad@chu.ma', role: 'Responsable RH', active: false }
    // Tu peux en ajouter d'autres ici
  ];

  // 🔍 Filtres combinés (rôle, statut, recherche)
  get utilisateursFiltres() {
    return this.utilisateurs.filter(user =>
      (this.filtreRole === 'tous' || user.role === this.filtreRole) &&
      (this.filtreStatut === 'tous' || (this.filtreStatut === 'actif' ? user.active : !user.active)) &&
      (
        user.nom.toLowerCase().includes(this.recherche.toLowerCase()) ||
        user.email.toLowerCase().includes(this.recherche.toLowerCase())
      )
    );
  }

  // 📄 Pagination dynamique
  get totalPages(): number {
    return Math.ceil(this.utilisateursFiltres.length / this.pageSize) || 1;
  }

  get paginatedUtilisateurs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.utilisateursFiltres.slice(start, start + this.pageSize);
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
}
