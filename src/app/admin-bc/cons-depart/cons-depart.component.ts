import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsCourrierService } from '../../services/cons-courrier.service';
import feather from 'feather-icons';
import Swal from 'sweetalert2';

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

  searchTerm: string = '';
  selectedService: string = '';
  selectedStatus: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  currentPageArchive: number = 1;

  constructor(private courrierService: ConsCourrierService) {}

  ngOnInit(): void {
    this.courrierService.getCourriersDepart().subscribe({
      next: (data: any) => {
        const allCourriers = data.courriers || [];
        this.enCours = allCourriers.filter((c: any) => !c.archiver);
        this.archives = allCourriers.filter((c: any) => c.archiver);

        const rawServices = allCourriers
          .map((c: any) => c.service)
          .filter((s: any) => typeof s === 'string');
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

  // ----- FILTRES -----
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

  // ----- PAGINATION -----
  get paginatedEnCours(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEnCours.slice(start, start + this.itemsPerPage);
  }

  get paginatedArchives(): any[] {
    const start = (this.currentPageArchive - 1) * this.itemsPerPage;
    return this.filteredArchives.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredEnCours.length / this.itemsPerPage);
  }

  totalPagesArchive(): number {
    return Math.ceil(this.filteredArchives.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  setPageArchive(page: number): void {
    this.currentPageArchive = page;
  }

  // ----- ACTIONS -----
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

  archiverCourrier(id: number): void {
    const courrier = this.enCours.find(c => c.id === id);
    if (!courrier) return;

    Swal.fire({
      title: 'Archiver ce courrier ?',
      text: `Objet : "${courrier.object}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, archiver',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courrierService.archiverCourrier(id).subscribe({
          next: () => {
            courrier.archiver = true;
            this.archives.push(courrier);
            this.enCours = this.enCours.filter(c => c.id !== id);

            Swal.fire({
              title: 'Archivé !',
              text: 'Le courrier a été archivé avec succès.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erreur archivage :', err);
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l’archivage.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}
