import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // Pour [(ngModel)]

@Component({
  selector: 'app-si-user-activation',
  standalone: true,
  templateUrl: './si-user-activation.component.html',
  styleUrls: ['./si-user-activation.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SiUserActivationComponent implements AfterViewInit {

  // ✅ Champ de recherche utilisé dans [(ngModel)]
  recherche: string = '';

  // ✅ Liste des comptes en attente
  comptes = [
    { nom: 'Amina El Fihri', email: 'amina@example.local', dateDemande: '2025-05-10' },
    { nom: 'Youssef Alaoui', email: 'youssef@example.local', dateDemande: '2025-05-11' },
    { nom: 'Sofia Bennis', email: 'sofia@example.local', dateDemande: '2025-05-12' }
  ];

  modalVisible = false;
  selectedUser: any = null;

  ngAfterViewInit(): void {
    import('feather-icons').then(feather => feather.replace());
  }

  // ✅ Afficher la modale
  ouvrirModal(user: any) {
    this.selectedUser = user;
    this.modalVisible = true;
  }

  // ✅ Fermer la modale
  fermerModal() {
    this.modalVisible = false;
    this.selectedUser = null;
  }

  // ✅ Valider activation
  activerUtilisateur() {
    this.comptes = this.comptes.filter(u => u !== this.selectedUser);
    this.fermerModal();
  }

  // ✅ Supprimer un compte
  supprimerUtilisateur(user: any) {
    this.comptes = this.comptes.filter(u => u !== user);
  }

  // ✅ Filtrer les comptes avec le champ recherche
  comptesFiltres() {
    const query = this.recherche.toLowerCase().trim();
    return this.comptes.filter(u =>
      u.nom.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
  }
}
