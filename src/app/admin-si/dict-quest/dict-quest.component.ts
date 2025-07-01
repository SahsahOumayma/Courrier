import { Component, OnInit, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { SiQuestionsService } from '../../services/si-questions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dict-quest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dict-quest.component.html',
  styleUrls: ['./dict-quest.component.css']
})
export class DictQuestComponent implements OnInit, AfterViewInit {
  questions: any[] = [];
  deletedQuestions: any[] = [];

  filteredQuestions: any[] = [];
  filteredDeleted: any[] = [];

  paginatedQuestions: any[] = [];
  paginatedDeleted: any[] = [];

  currentPage = 1;
  deletedPage = 1;
  itemsPerPage = 10;
  itemsPerPageDeleted = 10;
  paginationOptions: number[] = [5, 10, 20];

  searchTerm = '';
  searchDeleted = '';

  showAddModal = false;
  editingQuestion: any = null;
  newQuestionName = '';

  constructor(private questionService: SiQuestionsService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data.filter(q => !q.dateSuppression);
        this.deletedQuestions = data.filter(q => q.dateSuppression);
        this.applyFilter();
        this.applyFilterDeleted();
      },
      error: (err) => {
        Swal.fire('Erreur', 'Erreur lors du chargement des questions', 'error');
        console.error(err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredQuestions = this.questions.filter(q => q.nom.toLowerCase().includes(term));
    this.currentPage = 1;
    this.updatePaginatedQuestions();
  }

  applyFilterDeleted(): void {
    const term = this.searchDeleted.toLowerCase();
    this.filteredDeleted = this.deletedQuestions.filter(q => q.nom.toLowerCase().includes(term));
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  updatePaginatedQuestions(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedQuestions = this.filteredQuestions.slice(start, start + this.itemsPerPage);
  }

  updatePaginatedDeleted(): void {
    const start = (this.deletedPage - 1) * this.itemsPerPageDeleted;
    this.paginatedDeleted = this.filteredDeleted.slice(start, start + this.itemsPerPageDeleted);
  }

  totalPages(): number {
    return Math.ceil(this.filteredQuestions.length / this.itemsPerPage);
  }

  totalDeletedPages(): number {
    return Math.ceil(this.filteredDeleted.length / this.itemsPerPageDeleted);
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePaginatedQuestions();
  }

  changeItemsPerPageDeleted(): void {
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedQuestions();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedQuestions();
    }
  }

  previousDeletedPage(): void {
    if (this.deletedPage > 1) {
      this.deletedPage--;
      this.updatePaginatedDeleted();
    }
  }

  nextDeletedPage(): void {
    if (this.deletedPage < this.totalDeletedPages()) {
      this.deletedPage++;
      this.updatePaginatedDeleted();
    }
  }

  openEditModal(question: any): void {
    this.editingQuestion = { ...question };
    this.newQuestionName = question.nom;
    this.showAddModal = true;
  }

  closeModal(): void {
    this.showAddModal = false;
    this.editingQuestion = null;
    this.newQuestionName = '';
  }

  addOrEditQuestion(): void {
    const nom = this.newQuestionName.trim();
    if (!nom) return;

    if (this.editingQuestion) {
      this.questionService.updateQuestion(this.editingQuestion.id, nom).subscribe({
        next: () => {
          Swal.fire('Succès', 'Question modifiée avec succès.', 'success');
          this.closeModal();
          this.loadQuestions();
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Échec de la modification.', 'error');
        }
      });
    } else {
      this.questionService.addQuestion(nom).subscribe({
        next: () => {
          Swal.fire('Succès', 'Question ajoutée avec succès.', 'success');
          this.closeModal();
          this.loadQuestions();
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Impossible d’ajouter cette question.', 'error');
        }
      });
    }
  }

  deleteQuestion(id: number): void {
    Swal.fire({
      title: 'Supprimer cette question ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then(result => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe({
          next: () => {
            Swal.fire('Supprimé', 'La question a été supprimée.', 'success');
            this.loadQuestions();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Suppression échouée.', 'error');
          }
        });
      }
    });
  }

  restoreQuestion(id: number): void {
    Swal.fire({
      title: 'Restaurer cette question ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, restaurer',
      cancelButtonText: 'Annuler',
    }).then(result => {
      if (result.isConfirmed) {
        this.questionService.restoreQuestion(id).subscribe({
          next: () => {
            Swal.fire('Restauré', 'La question a été restaurée.', 'success');
            this.loadQuestions();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Échec de la restauration.', 'error');
          }
        });
      }
    });
  }
}
