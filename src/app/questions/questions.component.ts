import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, AfterViewChecked {
  step: number = 1;
  password: string = '';
  confirmPassword: string = '';
  pwError: boolean = false;

  questions: string[] = [];  // <-- vide au départ, chargée dynamiquement

  selectedQuestions: string[] = ['', '', ''];
  answers: string[] = ['', '', ''];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.getTokenFromURL();
    if (token) {
      this.authService.getSecurityQuestions(token).subscribe({
        next: (res) => {
          this.questions = res.questions || [];
          if (this.questions.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'Info',
              text: 'Aucune question de sécurité disponible.',
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des questions:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Erreur lors du chargement des questions de sécurité.",
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Token introuvable dans l'URL.",
      });
    }
  }

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
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Les mots de passe ne correspondent pas.",
        });
      }
    } else if (this.step >= 2 && this.step <= 3) {
      const idx = this.step - 2;
      if (this.selectedQuestions[idx] && this.answers[idx]) {
        this.step++;
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Attention',
          text: "Veuillez sélectionner une question et fournir une réponse.",
        });
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
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Questions de sécurité enregistrées avec succès.',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = '/'; // Redirection vers la page de connexion
          });
        },
        error: (err) => {
          if (err.status === 200 && err.error === '') {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Questions de sécurité enregistrées avec succès.',
              confirmButtonText: 'OK'
            }).then(() => {
              window.location.href = '/';
            });
            return;
          }
          const message =
            err?.error?.message ||
            (typeof err?.error === 'string' ? err.error : null) ||
            err?.statusText ||
            "Une erreur inconnue est survenue.";

          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Erreur : " + message,
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez remplir toutes les questions et réponses avant de soumettre.',
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
