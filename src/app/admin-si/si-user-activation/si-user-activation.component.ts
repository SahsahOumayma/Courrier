import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiActivationService } from '../../services/si-activation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-si-user-activation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-user-activation.component.html',
  styleUrls: ['./si-user-activation.component.css'],
})
export class SiUserActivationComponent implements OnInit {
  comptes: any[] = [];
  recherche: string = '';
  roles: any[] = [];
  services: any[] = [];

  modalVisible: boolean = false;
  selectedUser: any = null;
  selectedRole: string | null = null;
  selectedService: any = null;

  constructor(private service: SiActivationService) {}

  ngOnInit(): void {
    this.chargerComptes();
    this.chargerRoles();
    this.chargerServices();
  }

  chargerComptes() {
    this.service.getComptesInactifs().subscribe({
      next: (data) => (this.comptes = data),
      error: (err) => console.error('❌ Erreur chargement comptes :', err),
    });
  }

  chargerRoles() {
    this.service.getRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('❌ Erreur chargement rôles :', err),
    });
  }

  chargerServices() {
    this.service.getServices().subscribe({
      next: (data) => (this.services = data),
      error: (err) => console.error('❌ Erreur chargement services :', err),
    });
  }

  comptesFiltres(): any[] {
    if (!this.recherche) return this.comptes;
    const terme = this.recherche.toLowerCase();
    return this.comptes.filter((u) =>
      u.fullName.toLowerCase().includes(terme) ||
      u.email.toLowerCase().includes(terme) ||
      u.login.toLowerCase().includes(terme)
    );
  }

  ouvrirModal(user: any) {
    this.selectedUser = user;
    this.selectedRole = user.role || null;
    this.selectedService = user.service || null;
    this.modalVisible = true;
  }

  fermerModal() {
    this.modalVisible = false;
    this.selectedUser = null;
    this.selectedRole = null;
    this.selectedService = null;
  }

 activerUtilisateur(): void {
  if (!this.selectedUser || !this.selectedRole || !this.selectedService) {
    console.error("Tous les champs doivent être remplis.");
    return;
  }

  const payload = {
    id: this.selectedUser.id,
    role: this.selectedRole,
    serviceId: this.selectedService.id,
    active: true
  };

  this.service.activateUser(payload).subscribe({
    next: (res) => {
      console.log("✅ Utilisateur activé :", res);
      this.modalVisible = false;
      this.chargerComptes(); // recharge liste
    },
    error: (err) => {
      console.error("❌ Erreur d’activation :", err);
    }
  });
}

}
