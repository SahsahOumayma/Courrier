import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [CommonModule, FormsModule]
})
export class InscriptionComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    matricule: '',
    telephone: '',
    dateNaissance: '',
    login: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        let message = 'Inscription réussie. Vérifiez votre email.';
        if (typeof response === 'string') {
          message = response;
        } else if (response?.message) {
          message = response.message;
        }
        Swal.fire('Succès', message, 'success').then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        if (err.status === 200 && err.error && err.error.text) {
          console.warn('ℹ️ Faux positif détecté : statut 200 avec contenu JSON.');
          Swal.fire('Succès', err.error.text, 'success').then(() => {
            this.router.navigate(['/']);
          });
          return;
        }
        console.error('Erreur d\'inscription :', err);
        const message =
          err?.error?.message ||
          err?.error?.text ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        Swal.fire('Erreur', message, 'error');
      }
    });
  }
}
