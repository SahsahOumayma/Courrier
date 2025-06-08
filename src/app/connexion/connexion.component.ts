import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true, 
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ConnexionComponent {
  login: string = '';
  password: string = '';
  passwordVisible: boolean = false;

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = {
      login: this.login,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        switch (response.role) {
          case 'ADMINBC':
            this.router.navigate(['/admin-bc']);
            break;
          case 'RH':
            this.router.navigate(['/rh']);
            break;
          case 'DELEGUE':
            this.router.navigate(['/delegue']);
            break;
          case 'ADMINSI': 
            this.router.navigate(['/admin-si']);
            break;
            case 'RESPONSABLESVC': 
            this.router.navigate(['/res-svc']);
            break;
          default:
            alert("Rôle inconnu. Contactez l'administrateur.");
        }
      },
      error: () => {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      }
    });
  }
}
