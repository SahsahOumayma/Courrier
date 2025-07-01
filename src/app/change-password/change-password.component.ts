import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (!this.token) {
      Swal.fire('Erreur', 'Lien de réinitialisation invalide ou expiré.', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire('Erreur', 'Les mots de passe ne correspondent pas.', 'error');
      return;
    }

    this.authService.resetPassword(this.token, this.password).subscribe({
      next: (res) => {
        console.log('Réponse reçue :', res);
        Swal.fire('Succès', res, 'success').then(() => {
          window.location.href = '/'; // Redirection vers la page de connexion
        });
        this.password = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        if (err.status === 200 && err.error === '') {
          console.warn('Faux positif détecté. Statut 200 sans contenu.');
          Swal.fire('Succès', 'Mot de passe réinitialisé avec succès', 'success').then(() => {
            window.location.href = '/'; // Redirection même dans ce cas
          });
          this.password = '';
          this.confirmPassword = '';
          return;
        }

        console.error('Erreur backend :', err);
        const message =
          err?.error?.message ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        Swal.fire('Erreur', message, 'error');
      },
    });
  }
}
