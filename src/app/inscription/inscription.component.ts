// src/app/inscription/inscription.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class InscriptionComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    dateNaissance: '',
    login: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    // Envoi vers le backend via le service
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Inscription réussie. Vérifiez votre email pour activer votre compte.');
        this.router.navigate(['/']); // redirige vers la page de connexion
      },
      error: (err) => {
        console.error('Erreur inscription :', err);
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    });
  }
}
