import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import feather from 'feather-icons';
import { BcProfilService } from '../../services/bc-profil.service';

@Component({
  selector: 'app-bc-profil',
  standalone: true,
  templateUrl: './bc-profil.component.html',
  styleUrls: ['./bc-profil.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class BcProfilComponent implements OnInit, AfterViewInit {
  ongletActif: 'info' | 'securite' | 'preferences' = 'info';

  // Informations utilisateur
  fullName = '';
  email = '';
  phone = '';
  department = '';

  // Formulaires modifiables
  formFullName = '';
  formEmail = '';
  formPhone = '';

  // Données du mot de passe
  changePasswordDTO = {
    currentPassword: '',
    newPassword: '',
  };

  // Préférences utilisateur
  preferences = {
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
  };

  // Injection du service
  profilService = inject(BcProfilService) as BcProfilService;

  ngOnInit(): void {
    this.fetchPersonalInfo();
    this.fetchPreferences();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  changerOnglet(o: 'info' | 'securite' | 'preferences') {
    this.ongletActif = o;
    setTimeout(() => feather.replace(), 0);
  }

  fetchPersonalInfo(): void {
    this.profilService.getPersonalInfo().subscribe({
      next: (data) => {
        this.fullName = data.fullName;
        this.email = data.email;
        this.phone = data.phone;
        this.department = data.department;

        this.formFullName = data.fullName;
        this.formEmail = data.email;
        this.formPhone = data.phone;
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur chargement infos personnelles :', err);
        alert('Erreur lors du chargement du profil.');
      },
    });
  }

  updatePersonalInfo(): void {
    const dto = {
      fullName: this.formFullName,
      email: this.formEmail,
      phone: this.formPhone,
    };

    this.profilService.updatePersonalInfo(dto).subscribe({
      next: () => {
        alert('✅ Informations mises à jour.');
        this.fetchPersonalInfo();
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur mise à jour profil :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec de la mise à jour.'));
      },
    });
  }

  changePassword(): void {
    this.profilService.changePassword(this.changePasswordDTO).subscribe({
      next: () => {
        alert('✅ Mot de passe modifié avec succès.');
        this.changePasswordDTO.currentPassword = '';
        this.changePasswordDTO.newPassword = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur changement mot de passe :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec du changement.'));
      },
    });
  }

  fetchPreferences(): void {
    this.profilService.getPreferences().subscribe({
      next: (data) => {
        this.preferences = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur chargement préférences :', err);
        alert('Erreur de chargement des préférences.');
      },
    });
  }

  updatePreferences(): void {
    this.profilService.updatePreferences(this.preferences).subscribe({
      next: () => {
        alert('✅ Préférences mises à jour.');
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur mise à jour préférences :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec mise à jour des préférences.'));
      },
    });
  }
}
