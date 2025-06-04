import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import feather from 'feather-icons';

interface Urgence {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-si-urgence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-urgence.component.html',
  styleUrls: ['./si-urgence.component.css'],
})
export class SiUrgenceComponent implements OnInit {
  urgences: Urgence[] = [];
  filteredUrgences: Urgence[] = [];

  newUrgenceName: string = '';
  editedUrgenceName: string = '';
  editIndex: number | null = null;

  showAddForm: boolean = false;
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginationOptions: number[] = [5, 10, 20];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUrgences();
  }

  loadUrgences(): void {
    this.http
      .get<Urgence[]>('http://localhost:9090/api/admin-si/urgences')
      .subscribe({
        next: (data) => {
          this.urgences = data;
          this.applyFilter();
        },
        error: (err) => console.error('Erreur chargement urgences', err),
      });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.urgences.filter((u) =>
      u.nom.toLowerCase().includes(term)
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredUrgences = filtered.slice(start, end);
  }

  get paginatedUrgences(): Urgence[] {
    return this.filteredUrgences;
  }

  addUrgence(): void {
    if (!this.newUrgenceName.trim()) return;
    const newItem = { nom: this.newUrgenceName };

    this.http
      .post('http://localhost:9090/api/admin-si/urgences', newItem, {
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.newUrgenceName = '';
          this.showAddForm = false;
          this.loadUrgences(); // recharge la liste correctement
        },
        error: (err) => console.error('Erreur ajout', err),
      });
  }

  enableEdit(index: number, urgence: Urgence): void {
    this.editIndex = index;
    this.editedUrgenceName = urgence.nom;
  }

  saveEdit(urgence: Urgence): void {
    const updatedItem: Urgence = {
      id: urgence.id,
      nom: this.editedUrgenceName,
    };
    this.http
      .put(
        `http://localhost:9090/api/admin-si/urgences/${urgence.id}`,
        updatedItem
      )
      .subscribe({
        next: () => {
          this.editIndex = null;
          this.loadUrgences();
        },
        error: (err) => console.error('Erreur modification', err),
      });
  }

  deleteUrgence(id: number): void {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette urgence ?")) {
    this.http
      .delete(`http://localhost:9090/api/admin-si/delete/urgence/${id}`, {
        responseType: 'text'
      })
      .subscribe({
        next: () => {
          alert("Urgence supprimée avec succès ✅");
          this.loadUrgences();
        },
        error: (err) => {
          console.error("Erreur suppression", err);
          alert("Erreur lors de la suppression de l'urgence.");
        }
      });
  }
}


  totalPages(): number {
    const filtered = this.urgences.filter((u) =>
      u.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return Math.ceil(filtered.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilter();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.applyFilter();
    }
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.applyFilter();
  }
  ngAfterViewInit(): void {
      feather.replace();
    }
  
}
