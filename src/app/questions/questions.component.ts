import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements AfterViewChecked {
  step: number = 1;
  password: string = '';
  confirmPassword: string = '';
  pwError: boolean = false;

  questions = [
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

  getAvailableQuestions(index: number): string[] {
    const used = this.selectedQuestions.slice(0, index);
    return this.questions.filter(q => !used.includes(q));
  }

  goToNextStep() {
    if (this.step === 1) {
      if (this.password && this.password === this.confirmPassword) {
        this.pwError = false;
        this.step++;
      } else {
        this.pwError = true;
      }
    } else if (this.step >= 2 && this.step <= 3) {
      const idx = this.step - 2;
      if (this.selectedQuestions[idx] && this.answers[idx]) {
        this.step++;
      }
    }
  }

  submitForm() {
    const idx = 2;
    if (this.selectedQuestions[idx] && this.answers[idx]) {
      const token = this.getTokenFromURL();

      const payload = {
        password: this.password,
        question1: this.selectedQuestions[0],
        answer1: this.answers[0],
        question2: this.selectedQuestions[1],
        answer2: this.answers[1],
        question3: this.selectedQuestions[2],
        answer3: this.answers[2],
      };

      this.authService.sendSecurityQuestions(token, payload).subscribe({
        next: (res) => {
          console.log('✅ Réponse reçue :', res);
          alert('✅ Questions de sécurité enregistrées avec succès.');
        },
        error: (err) => {
          // Cas spécial : Angular considère les réponses textuelles 200 comme erreurs
          if (err.status === 200 && err.error === '') {
            console.warn('ℹ️ Faux positif détecté (200 avec corps vide)');
            alert('✅ Questions de sécurité enregistrées avec succès.');
            return;
          }

          console.error('❌ Erreur réelle :', err);
          const message =
            err?.error?.message ||
            (typeof err?.error === 'string' ? err.error : null) ||
            err?.statusText ||
            "Une erreur inconnue est survenue.";

          alert("❌ Erreur : " + message);
        }
      });
    }
  }

  getTokenFromURL(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get('token') || '';
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
