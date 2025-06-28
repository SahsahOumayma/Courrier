import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiActivationService } from '../../services/si-activation.service';
import { HttpErrorResponse } from '@angular/common/http';
import feather from 'feather-icons';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

@Component({
  selector: 'app-si-user-activation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-user-activation.component.html',
  styleUrls: ['./si-user-activation.component.css'],
})
export class SiUserActivationComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {
    feather.replace();
  }

  chargerComptes() {
    this.service.getComptesInactifs().subscribe({
      next: (data) => (this.comptes = data),
      error: (err) =>
        Swal.fire('Erreur', 'Erreur lors du chargement des comptes', 'error')
    });
  }

  chargerRoles() {
    this.service.getRoles().subscribe({
      next: (data) => (this.roles = data),
      error: () =>
        Swal.fire('Erreur', 'Erreur lors du chargement des rôles', 'error')
    });
  }

  chargerServices() {
    this.service.getServices().subscribe({
      next: (data) => (this.services = data),
      error: () =>
        Swal.fire('Erreur', 'Erreur lors du chargement des services', 'error')
    });
  }

  comptesFiltres(): any[] {
    const terme = this.recherche.toLowerCase().trim();
    return this.comptes.filter(
      (u) =>
        u.fullName.toLowerCase().includes(terme) ||
        u.email.toLowerCase().includes(terme) ||
        u.login.toLowerCase().includes(terme)
    );
  }

  ouvrirModal(user: any) {
    this.selectedUser = user;
    this.selectedRole = user.role || null;
    this.selectedService = this.services.find((s) => s.nom === user.service) || null;
    this.modalVisible = true;
  }

  fermerModal() {
    this.modalVisible = false;
    this.selectedUser = null;
    this.selectedRole = null;
    this.selectedService = null;
  }

  activerUtilisateur(): void {
    if (!this.selectedUser || !this.selectedRole || !this.selectedService?.id) {
      Swal.fire('Champs manquants', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }

    const payload = {
      id: this.selectedUser.id,
      role: this.selectedRole,
      serviceId: this.selectedService.id,
      active: true,
    };

    this.service.activateUser(payload).subscribe({
      next: (res) => {
        Swal.fire('Succès', 'Utilisateur activé avec succès.', 'success');
        this.modalVisible = false;
        this.chargerComptes();
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur d’activation :', err);
        Swal.fire('Erreur', 'L’activation a échoué. Veuillez réessayer.', 'error');
      },
    });
  }
}
