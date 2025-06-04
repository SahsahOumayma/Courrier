import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
      // ✅ Si backend retourne un simple texte ou objet
      if (typeof response === 'string') {
        alert('✅ ' + response);
      } else if (response?.message) {
        alert('✅ ' + response.message);
      } else {
        alert('✅ Inscription réussie. Vérifiez votre email.');
      }

      this.router.navigate(['/']);
    },
    error: (err) => {
      // ✅ Faux positif : Angular croit que c'est une erreur mais c’est 200 OK
      if (err.status === 200 && err.error && err.error.text) {
        console.warn('ℹ️ Faux positif détecté : statut 200 avec contenu JSON.');
        alert('✅ ' + err.error.text);
        this.router.navigate(['/']);
        return;
      }

      // ❌ Vraie erreur
      console.error('❌ Erreur d\'inscription :', err);
      const message =
        err?.error?.message ||
        err?.error?.text || // <- pour ton cas précis
        JSON.stringify(err?.error) ||
        err?.statusText ||
        'Une erreur inconnue est survenue.';

      alert('❌ Erreur : ' + message);
    }
  });
}

  }
