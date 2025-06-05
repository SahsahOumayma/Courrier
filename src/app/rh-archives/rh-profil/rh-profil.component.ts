import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import feather from 'feather-icons';
import { RhProfilService } from '../../services/rh-profil.service';

@Component({
  selector: 'app-rh-profil',
  standalone: true,
  templateUrl: './rh-profil.component.html',
  styleUrls: ['./rh-profil.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class RhProfilComponent implements OnInit, AfterViewInit {
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

  profilService = inject(RhProfilService) as RhProfilService;

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
        alert('❌ Erreur chargement profil');
        console.error(err);
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
        alert('❌ ' + (err.error?.message || 'Erreur mise à jour infos.'));
        console.error(err);
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
        alert('❌ ' + (err.error?.message || 'Erreur changement mot de passe.'));
        console.error(err);
      },
    });
  }

  fetchPreferences(): void {
    this.profilService.getPreferences().subscribe({
      next: (data) => {
        this.preferences = data;
      },
      error: (err: HttpErrorResponse) => {
        alert('❌ Erreur chargement préférences.');
        console.error(err);
      },
    });
  }

  updatePreferences(): void {
    this.profilService.updatePreferences(this.preferences).subscribe({
      next: () => {
        alert('✅ Préférences mises à jour.');
      },
      error: (err: HttpErrorResponse) => {
        alert('❌ ' + (err.error?.message || 'Erreur mise à jour préférences.'));
        console.error(err);
      },
    });
  }
}
