import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import feather from 'feather-icons';
import { SiGestionService, UtilisateurDTO } from '../../services/si-gestion.service';

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

  roles: string[] = [];
  services: { id: number, nom: string }[] = [];

  constructor(private siService: SiGestionService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.siService.getRoles().subscribe(data => {
      this.roles = data.map(r => r.nom);
    });
    this.siService.getServices().subscribe(data => {
      this.services = data;
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
    const selectedService = this.services.find(s => s.nom === this.utilisateurActif.service);

    const dto = {
      id: this.utilisateurActif.id,
      role: this.utilisateurActif.role,
      serviceId: selectedService?.id,
      active: this.utilisateurActif.active
    };

    this.siService.modifierUtilisateur(dto).subscribe({
      next: () => {
        this.chargerUtilisateurs();
        this.fermerModal();
      },
      error: err => console.error('Erreur modification :', err)
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
}
