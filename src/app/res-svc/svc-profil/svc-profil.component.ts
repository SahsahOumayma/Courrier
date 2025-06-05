import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import feather from 'feather-icons';
import { SvcProfilService } from '../../services/svc-profil.service'; // ajuste si besoin

@Component({
  selector: 'app-svc-profil',
  standalone: true,
  templateUrl: './svc-profil.component.html',
  styleUrls: ['./svc-profil.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SvcProfilComponent implements OnInit, AfterViewInit {
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

  profilService = inject(SvcProfilService) as SvcProfilService;

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
        console.error('❌ Erreur chargement profil :', err);
        alert('Erreur lors du chargement des informations personnelles.');
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
        alert('✅ Mot de passe modifié.');
        this.changePasswordDTO = { currentPassword: '', newPassword: '' };
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
        alert('Erreur lors du chargement des préférences.');
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
        alert('Erreur : ' + (err.error?.message || 'Échec de la mise à jour.'));
      },
    });
  }
}
