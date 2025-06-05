import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
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
      alert('❌ Lien de réinitialisation invalide ou expiré.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('❌ Les mots de passe ne correspondent pas.');
      return;
    }

    this.authService.resetPassword(this.token, this.password)
      .subscribe({
        next: (res) => {
          console.log('✅ Réponse brute reçue :', res);
          alert('✅ ' + res);
          this.password = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          if (err.status === 200 && err.error === "") {
            console.warn('ℹ️ Faux positif détecté. Statut 200 sans contenu.');
            alert('✅ Mot de passe réinitialisé avec succès');
            this.password = '';
            this.confirmPassword = '';
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
}
