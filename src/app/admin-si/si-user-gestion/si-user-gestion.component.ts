import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import feather from 'feather-icons';
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
  recherche: string = '';
  modalOuvert: boolean = false;
  enEdition: boolean = false;

  utilisateurActif: UtilisateurDTO = this.nouvelUtilisateur();

  roles: { label: string; value: string }[] = [];
  services: { label: string; value: number }[] = [];

  constructor(private siService: SiGestionService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();

    this.siService.getRoles().subscribe((data: RoleDTO[]) => {
      this.roles = data.map(r => ({
        label: this.formatLabel(r.nom),
        value: r.nom.toUpperCase()
      }));
    });

    this.siService.getServices().subscribe((data: ServiceDTO[]) => {
      this.services = data.map(s => ({
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

  utilisateursFiltres(): UtilisateurDTO[] {
    const filtre = this.recherche.toLowerCase().trim();
    return this.utilisateurs.filter(u =>
      u.fullName.toLowerCase().includes(filtre) ||
      u.email.toLowerCase().includes(filtre)
    );
  }

  ouvrirModalEdition(utilisateur: UtilisateurDTO): void {
    this.utilisateurActif = { ...utilisateur };
    this.enEdition = true;
    this.modalOuvert = true;
  }

  fermerModal(): void {
    this.modalOuvert = false;
  }

  enregistrerUtilisateur(): void {
    const selectedService = this.services.find(s => s.label === this.utilisateurActif.service);
    if (!selectedService) {
      console.error('Service non trouvé pour:', this.utilisateurActif.service);
      return;
    }

    const dto = {
      id: this.utilisateurActif.id,
      role: this.utilisateurActif.role?.toUpperCase(),
      serviceId: selectedService.value,
      active: this.utilisateurActif.active
    };

    console.log('DTO envoyé au backend :', dto);

    this.siService.modifierUtilisateur(dto).subscribe({
      next: res => {
        console.log('Réponse backend :', res);
        this.chargerUtilisateurs();
        this.fermerModal();
      },
      error: err => {
        console.error('Erreur modification :', err);
        alert("Erreur lors de la modification de l'utilisateur");
      }
    });
  }

  supprimerUtilisateur(id: number): void {
    this.siService.supprimerUtilisateur(id).subscribe(() => {
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
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
