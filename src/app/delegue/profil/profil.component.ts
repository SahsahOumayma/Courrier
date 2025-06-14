import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ProfilComponent implements OnInit, AfterViewInit {
  ongletActif: 'info' | 'securite' | 'preferences' = 'info';

  fullName = '';
  email = '';
  phone = '';
  department = '';

  formFullName = '';
  formEmail = '';
  formPhone = '';

  changePasswordDTO = {
    currentPassword: '',
    newPassword: '',
  };

  preferences = {
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
  };

  profilService = inject(ProfilService);

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

  // Charger infos personnelles depuis le backend
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
      error: (err) => {
        console.error('Erreur chargement infos personnelles :', err);
        alert('Erreur chargement profil.');
      },
    });
  }

  // Soumettre les modifications d'infos personnelles
  updatePersonalInfo(): void {
    const dto = {
      fullName: this.formFullName,
      email: this.formEmail,
      phone: this.formPhone,
    };

    this.profilService.updatePersonalInfo(dto).subscribe({
      next: (res) => {
        alert('✅ Informations mises à jour.');
        this.fetchPersonalInfo();
      },
      error: (err) => {
        console.error('Erreur modification profil :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec de la mise à jour.'));
      },
    });
  }

  // Soumettre changement de mot de passe
  changePassword(): void {
    this.profilService.changePassword(this.changePasswordDTO).subscribe({
      next: () => {
        alert('✅ Mot de passe modifié avec succès.');
        this.changePasswordDTO.currentPassword = '';
        this.changePasswordDTO.newPassword = '';
      },
      error: (err) => {
        console.error('Erreur changement mot de passe :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec du changement.'));
      },
    });
  }

  // Charger préférences depuis le backend
  fetchPreferences(): void {
    this.profilService.getPreferences().subscribe({
      next: (data) => {
        this.preferences = data;
      },
      error: (err) => {
        console.error('Erreur chargement préférences :', err);
        alert('Erreur de chargement des préférences.');
      },
    });
  }

  // Soumettre préférences modifiées
  updatePreferences(): void {
    this.profilService.updatePreferences(this.preferences).subscribe({
      next: () => {
        alert('✅ Préférences mises à jour.');
      },
      error: (err) => {
        console.error('Erreur mise à jour préférences :', err);
        alert('Erreur : ' + (err.error?.message || 'Échec mise à jour préférences.'));
      },
    });
  }
}
