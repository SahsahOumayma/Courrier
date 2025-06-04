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
        console.error('❌ Erreur de chargement du profil :', err);
        alert('❌ Erreur de chargement du profil.');
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
      next: (res) => {
        console.log('✅ Réponse brute reçue :', res);
        alert('✅ ' + res);
        this.fetchPersonalInfo();
      },
      error: (err) => {
        if (err.status === 200 && err.error === '') {
          console.warn('ℹ️ Faux positif détecté. Statut 200 sans contenu.');
          alert('✅ Informations mises à jour');
          this.fetchPersonalInfo();
          return;
        }

        console.error('❌ Erreur backend :', err);
        const message =
          err?.error?.message ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        alert('❌ Erreur : ' + message);
      },
    });
  }

  changePassword(): void {
    this.profilService.changePassword(this.changePasswordDTO).subscribe({
      next: (res) => {
        console.log('✅ Mot de passe changé :', res);
        alert('✅ ' + res);
        this.changePasswordDTO.currentPassword = '';
        this.changePasswordDTO.newPassword = '';
      },
      error: (err) => {
        if (err.status === 200 && err.error === '') {
          console.warn('ℹ️ Faux positif détecté. Statut 200 sans contenu.');
          alert('✅ Mot de passe mis à jour');
          this.changePasswordDTO.currentPassword = '';
          this.changePasswordDTO.newPassword = '';
          return;
        }

        console.error('❌ Erreur changement de mot de passe :', err);
        const message =
          err?.error?.message ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        alert('❌ Erreur : ' + message);
      },
    });
  }

  fetchPreferences(): void {
    this.profilService.getPreferences().subscribe({
      next: (data) => {
        this.preferences = data;
      },
      error: (err) => {
        console.error('❌ Erreur chargement préférences :', err);
        alert('❌ Erreur de chargement des préférences.');
      },
    });
  }

  updatePreferences(): void {
    this.profilService.updatePreferences(this.preferences).subscribe({
      next: (res) => {
        console.log('✅ Préférences mises à jour :', res);
        alert('✅ ' + res);
      },
      error: (err) => {
        if (err.status === 200 && err.error === '') {
          console.warn('ℹ️ Faux positif détecté. Statut 200 sans contenu.');
          alert('✅ Préférences mises à jour');
          return;
        }

        console.error('❌ Erreur lors de la mise à jour des préférences :', err);
        const message =
          err?.error?.message ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        alert('❌ Erreur : ' + message);
      },
    });
  }
}
