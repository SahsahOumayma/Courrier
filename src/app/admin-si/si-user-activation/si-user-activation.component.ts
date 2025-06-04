import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiActivationService } from '../../services/si-activation.service';
import { HttpErrorResponse } from '@angular/common/http';
import feather from 'feather-icons';

@Component({
  selector: 'app-si-user-activation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-user-activation.component.html',
  styleUrls: ['./si-user-activation.component.css'],
})
export class SiUserActivationComponent implements OnInit {
  utilisateurs: any[] = [];
  recherche: string = '';
  modalVisible: boolean = false;
  selectedUser: any = null;

  constructor(private siActivationService: SiActivationService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.siActivationService.getToActivateUsers().subscribe({
      next: (data) => (this.utilisateurs = data),
      error: (err) => console.error('Erreur chargement utilisateurs:', err),
    });
  }

  comptesFiltres(): any[] {
    const r = this.recherche.toLowerCase();
    return this.utilisateurs.filter(
      (u) =>
        u.fullName.toLowerCase().includes(r) ||
        u.email.toLowerCase().includes(r) ||
        u.login.toLowerCase().includes(r)
    );
  }

  ouvrirModal(user: any): void {
    this.selectedUser = user;
    this.modalVisible = true;
  }

  fermerModal(): void {
    this.selectedUser = null;
    this.modalVisible = false;
  }

  activerUtilisateur(): void {
    if (!this.selectedUser) return;

    const payload = {
      id: this.selectedUser.id,
      role: this.selectedUser.role || 'USER', // Si le rôle est vide
      serviceId: this.selectedUser.serviceId || 1, // Par défaut, ou à adapter
      active: true,
    };

    this.siActivationService.activerUtilisateur(payload).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(
          (u) => u.id !== this.selectedUser.id
        );
        this.fermerModal();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur activation', err);
        alert('Erreur lors de l’activation de l’utilisateur.');
      },
    });
  }

  supprimerUtilisateur(user: any): void {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    this.siActivationService.deleteUser(user.id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== user.id);
        alert("Utilisateur supprimé avec succès ✅");
      },
      error: (err: HttpErrorResponse) => {
        console.error("Erreur suppression utilisateur", err);
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    });
  }
}

  ngAfterViewInit(): void {
      feather.replace();
    }
}
