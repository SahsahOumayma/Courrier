import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ← Import requis
import { CommonModule } from '@angular/common'; // Pour *ngIf, *ngFor
import feather from 'feather-icons';

interface Utilisateur {
  nom: string;
  email: string;
  role: string;
  service: string;
  actif: boolean;
}

@Component({
  selector: 'app-si-user-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule], // ← AJOUT OBLIGATOIRE
  templateUrl: './si-user-gestion.component.html',
  styleUrls: ['./si-user-gestion.component.css']
})
export class SiUserGestionComponent implements OnInit, AfterViewInit {
  utilisateurs: Utilisateur[] = [
    { nom: 'Karim Benali', email: 'karim.b@example.local', role: 'RH', service: 'Ressources Humaines', actif: true },
    { nom: 'Imane El Idrissi', email: 'imane.e@example.local', role: 'Finance', service: 'Comptabilité', actif: false },
  ];

  recherche: string = '';
  modalOuvert: boolean = false;
  enEdition: boolean = false;

  utilisateurActif: Utilisateur = this.nouvelUtilisateur();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    feather.replace();
  }

  utilisateursFiltres(): Utilisateur[] {
    const filtre = this.recherche.toLowerCase().trim();
    return this.utilisateurs.filter(u =>
      u.nom.toLowerCase().includes(filtre) ||
      u.email.toLowerCase().includes(filtre)
    );
  }

  ouvrirModalAjout(): void {
    this.utilisateurActif = this.nouvelUtilisateur();
    this.enEdition = false;
    this.modalOuvert = true;
  }

  ouvrirModalEdition(utilisateur: Utilisateur): void {
    this.utilisateurActif = { ...utilisateur };
    this.enEdition = true;
    this.modalOuvert = true;
  }

  fermerModal(): void {
    this.modalOuvert = false;
  }

  enregistrerUtilisateur(): void {
    if (this.enEdition) {
      const index = this.utilisateurs.findIndex(u => u.email === this.utilisateurActif.email);
      if (index !== -1) this.utilisateurs[index] = { ...this.utilisateurActif };
    } else {
      this.utilisateurs.push({ ...this.utilisateurActif });
    }
    this.fermerModal();
  }

  supprimerUtilisateur(email: string): void {
    this.utilisateurs = this.utilisateurs.filter(u => u.email !== email);
  }

  nouvelUtilisateur(): Utilisateur {
    return { nom: '', email: '', role: '', service: '', actif: true };
  }
}
