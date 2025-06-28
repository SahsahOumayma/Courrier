import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import {
  SiGestionService,
  UtilisateurDTO,
  RoleDTO,
  ServiceDTO
} from '../../services/si-gestion.service';

@Component({
  selector: 'app-si-user-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './si-user-gestion.component.html',
  styleUrls: ['./si-user-gestion.component.css']
})
export class SiUserGestionComponent implements OnInit, AfterViewInit {
  utilisateurs: UtilisateurDTO[] = [];
  utilisateursSupprimes: UtilisateurDTO[] = [];

  recherche: string = '';
  rechercheHistorique: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  currentPageDeleted: number = 1;
  itemsPerPageDeleted: number = 5;

  modalOuvert: boolean = false;
  enEdition: boolean = false;

  utilisateurActif: UtilisateurDTO = this.nouvelUtilisateur();

  roles: { label: string; value: string }[] = [];
  services: { label: string; value: number }[] = [];

  constructor(private siService: SiGestionService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.chargerUtilisateursSupprimes();

    this.siService.getRoles().subscribe((data: RoleDTO[]) => {
      this.roles = data
        .filter(r => !r.dateSuppression) // filtre les roles actifs
        .map(r => ({
          label: this.formatLabel(r.nom),
          value: r.nom.toUpperCase()
        }));
    });

    this.siService.getServices().subscribe((data: ServiceDTO[]) => {
      this.services = data
        .filter(s => !s.dateSuppression) // filtre les services actifs
        .map(s => ({
          label: s.nom,
          value: s.id
        }));
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  chargerUtilisateurs(): void {
    this.siService.getUtilisateursActifs().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  chargerUtilisateursSupprimes(): void {
    this.siService.getUtilisateursSupprimes().subscribe(data => {
      this.utilisateursSupprimes = data;
    });
  }

  utilisateursFiltres(): UtilisateurDTO[] {
    const filtre = this.recherche.toLowerCase().trim();
    return this.utilisateurs.filter(u =>
      u.fullName.toLowerCase().includes(filtre) ||
      u.email.toLowerCase().includes(filtre)
    );
  }

  utilisateursFiltresHistorique(): UtilisateurDTO[] {
    const filtre = this.rechercheHistorique.toLowerCase().trim();
    return this.utilisateursSupprimes.filter(u =>
      u.fullName.toLowerCase().includes(filtre) ||
      u.email.toLowerCase().includes(filtre)
    );
  }

  paginatedUtilisateurs(): UtilisateurDTO[] {
    const debut = (this.currentPage - 1) * this.itemsPerPage;
    return this.utilisateursFiltres().slice(debut, debut + this.itemsPerPage);
  }

  paginatedSupprimes(): UtilisateurDTO[] {
    const debut = (this.currentPageDeleted - 1) * this.itemsPerPageDeleted;
    return this.utilisateursFiltresHistorique().slice(debut, debut + this.itemsPerPageDeleted);
  }

  totalPages(): number {
    return Math.ceil(this.utilisateursFiltres().length / this.itemsPerPage);
  }

  totalPagesHistorique(): number {
    return Math.ceil(this.utilisateursFiltresHistorique().length / this.itemsPerPageDeleted);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPageDeleted(): void {
    if (this.currentPageDeleted < this.totalPagesHistorique()) this.currentPageDeleted++;
  }

  previousPageDeleted(): void {
    if (this.currentPageDeleted > 1) this.currentPageDeleted--;
  }

  changerItemsParPage(): void {
    this.currentPage = 1;
  }

  changerItemsParPageHistorique(): void {
    this.currentPageDeleted = 1;
  }

  ouvrirModalEdition(utilisateur: UtilisateurDTO | null): void {
    if (utilisateur) {
      this.utilisateurActif = { ...utilisateur };
      this.enEdition = true;
    } else {
      this.utilisateurActif = this.nouvelUtilisateur();
      this.enEdition = false;
    }
    this.modalOuvert = true;
  }

  fermerModal(): void {
    this.modalOuvert = false;
  }

  enregistrerUtilisateur(): void {
    const selectedService = this.services.find(s => s.label === this.utilisateurActif.service);
    if (!selectedService) {
      console.error('Service non trouvé');
      return;
    }

    const dto = {
      id: this.utilisateurActif.id,
      role: this.utilisateurActif.role?.toUpperCase(),
      serviceId: selectedService.value,
      active: this.utilisateurActif.active
    };

    this.siService.modifierUtilisateur(dto).subscribe({
      next: () => {
        Swal.fire('Succès', 'Utilisateur modifié avec succès', 'success');
        this.chargerUtilisateurs();
        this.fermerModal();
      },
      error: () => Swal.fire('Erreur', 'Modification échouée', 'error')
    });
  }

  supprimerUtilisateur(id: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.siService.supprimerUtilisateur(id).subscribe(() => {
          this.chargerUtilisateurs();
          this.chargerUtilisateursSupprimes();
          Swal.fire('Supprimé', 'Utilisateur supprimé avec succès', 'success');
        });
      }
    });
  }

  restaurerUtilisateur(id: number): void {
    Swal.fire({
      title: 'Restaurer ?',
      text: 'Voulez-vous restaurer cet utilisateur ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then(result => {
      if (result.isConfirmed) {
        this.siService.restaurerUtilisateur(id).subscribe(() => {
          this.chargerUtilisateurs();
          this.chargerUtilisateursSupprimes();
          Swal.fire('Restauré', 'Utilisateur restauré avec succès', 'success');
        });
      }
    });
  }

  nouvelUtilisateur(): UtilisateurDTO {
    return {
      id: 0,
      fullName: '',
      email: '',
      role: '',
      service: '',
      active: true,
      checkEmail: false
    };
  }

  private formatLabel(enumValue: string): string {
    return enumValue
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  }
}