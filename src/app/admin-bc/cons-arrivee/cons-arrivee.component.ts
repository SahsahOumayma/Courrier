import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsCourrierService } from '../../services/cons-courrier.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-cons-arrivee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cons-arrivee.component.html',
  styleUrls: ['./cons-arrivee.component.css']
})
export class ConsArriveeComponent implements OnInit, AfterViewInit {
  enCours: any[] = [];
  archives: any[] = [];
  services: string[] = [];

  searchTerm: string = '';
  selectedService: string = '';
  selectedStatus: string = ''; // ⬅️ filtre par statut
  itemsPerPage: number = 5;

  currentPage: number = 1;
  currentPageArchive: number = 1;

  constructor(private courrierService: ConsCourrierService) {}

  ngOnInit(): void {
    this.courrierService.getCourriersArrivee().subscribe({
      next: (data: any) => {
        const allCourriers = data.courriers || [];
        this.enCours = allCourriers.filter((c: any) => !c.archiver);
        this.archives = allCourriers.filter((c: any) => c.archiver);

        const rawServices: any[] = allCourriers.map((c: any) => c.service).filter((s: any): s is string => typeof s === 'string');
        this.services = [...new Set<string>(rawServices)];
      },
      error: (err) => {
        console.error('Erreur de chargement des courriers :', err);
      },
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  // 🔵 Courriers en cours
  get filteredEnCours(): any[] {
    return this.enCours.filter(c =>
      (!this.searchTerm || c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.service?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedService || c.service === this.selectedService)
    );
  }

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

  // 🟡 Courriers archivés
  get filteredArchives(): any[] {
    return this.archives.filter(c =>
      (!this.searchTerm || c.object?.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.service?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedService || c.service === this.selectedService)
    );
  }

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

  // ✅ Action : archiver
  traiterCourrier(index: number): void {
    const courrier = this.paginatedEnCours[index];
    courrier.archiver = true;
    this.archives.push(courrier);
    this.enCours = this.enCours.filter(c => c !== courrier);
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
