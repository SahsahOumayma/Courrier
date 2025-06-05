import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsCourrierService } from '../../services/cons-courrier.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-cons-depart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cons-depart.component.html',
  styleUrls: ['./cons-depart.component.css'],
})
export class ConsDepartComponent implements OnInit, AfterViewInit {
  enCours: any[] = [];
  archives: any[] = [];
  services: string[] = [];

  // Recherche / filtre
  searchTerm: string = '';
  selectedService: string = '';
  selectedStatus: string = '';

  // Pagination EN COURS
  itemsPerPage: number = 5;
  currentPage: number = 1;

  // Pagination ARCHIVÉS
  currentPageArchive: number = 1;

  constructor(private courrierService: ConsCourrierService) {}

  ngOnInit(): void {
    this.courrierService.getCourriersDepart().subscribe({
      next: (data: any) => {
        const allCourriers = data.courriers || [];
        this.enCours = allCourriers.filter((c: any) => !c.archiver);
        this.archives = allCourriers.filter((c: any) => c.archiver);

        // Liste unique des services
        const rawServices = allCourriers.map((c: any) => c.service).filter((s: any) => typeof s === 'string');
        this.services = [...new Set<string>(rawServices)];
      },
      error: (err) => {
        console.error('Erreur de chargement des courriers départ :', err);
      },
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  // --------- FILTRAGE ---------

  get filteredEnCours(): any[] {
    return this.enCours.filter(c =>
      (!this.searchTerm || c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.service?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedService || c.service === this.selectedService)
    );
  }

  get filteredArchives(): any[] {
    return this.archives.filter(c =>
      (!this.searchTerm || c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.service?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedService || c.service === this.selectedService)
    );
  }

  // --------- PAGINATION EN COURS ---------

  get paginatedEnCours(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEnCours.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredEnCours.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  // --------- PAGINATION ARCHIVÉ ---------

  get paginatedArchives(): any[] {
    const start = (this.currentPageArchive - 1) * this.itemsPerPage;
    return this.filteredArchives.slice(start, start + this.itemsPerPage);
  }

  totalPagesArchive(): number {
    return Math.ceil(this.filteredArchives.length / this.itemsPerPage);
  }

  setPageArchive(page: number): void {
    this.currentPageArchive = page;
  }

  // --------- ACTIONS ---------

 voirPdf(id: number): void {
  const url = `http://localhost:9090/api/admin-bc/api/courriers/${id}/view-pdf`;
  window.open(url, '_blank');
}

telechargerPdf(id: number): void {
  const url = `http://localhost:9090/api/admin-bc/api/courriers/${id}/download`;
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.click();
}


}
