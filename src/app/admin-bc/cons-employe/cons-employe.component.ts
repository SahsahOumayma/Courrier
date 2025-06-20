import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-cons-employe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cons-employe.component.html',
  styleUrls: ['./cons-employe.component.css']
})
export class ConsEmployeComponent implements OnInit, AfterViewInit {
  courriers: any[] = [];
  paginated: any[] = [];
  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9090/api/admin-bc/consulter-courrier/employe').subscribe({
      next: data => {
        this.courriers = data;
        this.updatePagination();
        this.isLoading = false;
        feather.replace(); // met à jour les icônes après chargement
      },
      error: err => {
        console.error('Erreur lors de la récupération des courriers employés:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  filterCourriers() {
    return this.courriers.filter(c =>
      (!this.searchTerm || c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.employeNom?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginated = this.filterCourriers().slice(start, end);
    feather.replace(); // re-render icons if table content changes
  }

  totalPages(): number {
    return Math.ceil(this.filterCourriers().length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // ✅ Voir le PDF
  voirPdf(id: number): void {
    window.open(`http://localhost:9090/api/admin-bc/api/courriers/${id}/view-pdf`, '_blank');
  }

  // ✅ Télécharger le PDF
  telechargerPdf(id: number): void {
    const url = `http://localhost:9090/api/admin-bc/api/courriers/${id}/download`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
