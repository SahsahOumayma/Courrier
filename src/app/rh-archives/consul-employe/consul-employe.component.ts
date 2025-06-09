import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-consul-employe',
  standalone: true,
  templateUrl: './consul-employe.component.html',
  styleUrls: ['./consul-employe.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConsulEmployeComponent implements OnInit, AfterViewInit {
  courriers: any[] = [];
  paginated: any[] = [];
  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9090/api/RH/consulter-courrier/employe').subscribe({
      next: data => {
        this.courriers = data;
        this.updatePagination();
      },
      error: err => {
        console.error('Erreur lors de la récupération :', err);
      }
    });
  }

  ngAfterViewInit(): void {
    feather.replace(); // recharge les icônes à l'initialisation
  }

  filterCourriers() {
    return this.courriers.filter(c =>
      (!this.searchTerm ||
        c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.employeNom?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginated = this.filterCourriers().slice(start, end);

    // Ajout pour mettre à jour les icônes après affichage
    setTimeout(() => feather.replace(), 0);
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

  voirPdf(id: number): void {
    window.open(`http://localhost:9090/api/admin-bc/api/courriers/${id}/view-pdf`, '_blank');
  }

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
