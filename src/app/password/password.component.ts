import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  step = 0;
  showEmailForm = false;
  showQuestionForm = false;
  email = '';
  emailSent = false;
  password = '';

  questions: string[] = [
    "Nom de votre premier animal ?",
    "Votre couleur préférée ?",
    "Nom de jeune fille de votre mère ?",
    "Votre premier emploi ?",
    "Ville de naissance ?",
    "Film favori ?",
    "École primaire ?",
    "Plat préféré ?"
  ];

  selectedQuestions: string[] = ['', '', ''];
  answers: string[] = ['', '', ''];

  constructor(private authService: AuthService) {}

  chooseEmail(): void {
    this.resetState();
    this.showEmailForm = true;
  }

  chooseQuestions(): void {
    this.resetState();
    this.showQuestionForm = true;
  }

  sendEmail(): void {
    if (!this.email.trim()) return;

    this.authService.sendRecoveryEmail(this.email.trim()).subscribe({
      next: () => this.emailSent = true,
      error: (err) => {
        console.error('Erreur lors de l’envoi de l’email', err);
        alert("Erreur serveur : impossible d'envoyer l'email.");
      }
    });
  }

  nextStep(): void {
    if (this.step < 2) {
      this.step++;
    }
  }

  finish(): void {
    if (!this.password.trim()) {
      alert("Veuillez saisir un nouveau mot de passe.");
      return;
    }

    const payload = {
      question1: this.selectedQuestions[0],
      answer1: this.answers[0],
      question2: this.selectedQuestions[1],
      answer2: this.answers[1],
      question3: this.selectedQuestions[2],
      answer3: this.answers[2]
    };

    this.authService.resetPasswordByQuestions(this.email.trim(), payload, this.password.trim()).subscribe({
      next: () => alert('Mot de passe réinitialisé avec succès'),
      error: () => alert("Erreur : réponses incorrectes ou problème serveur.")
    });
  }

  getRemainingQuestions(index: number): string[] {
    return this.questions.filter(q =>
      !this.selectedQuestions.includes(q) || this.selectedQuestions[index] === q
    );
  }

  private resetState(): void {
    this.showEmailForm = false;
    this.showQuestionForm = false;
    this.step = 0;
    this.selectedQuestions = ['', '', ''];
    this.answers = ['', '', ''];
    this.emailSent = false;
    this.password = '';
  }
}
