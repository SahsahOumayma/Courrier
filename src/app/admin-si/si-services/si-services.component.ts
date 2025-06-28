import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { SiServiceService, ServiceIntern } from '../../services/si-service.service';

@Component({
  selector: 'app-si-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './si-services.component.html',
  styleUrls: ['./si-services.component.css']
})
export class SiServicesComponent implements OnInit, AfterViewInit {
  services: ServiceIntern[] = [];
  filteredServices: ServiceIntern[] = [];
  paginatedServices: ServiceIntern[] = [];

  history: ServiceIntern[] = [];
  filteredHistory: ServiceIntern[] = [];
  paginatedHistory: ServiceIntern[] = [];

  searchQuery = '';
  searchHistory = '';
  newServiceName = '';
  showAddForm = false;

  currentPageServices = 1;
  itemsPerPageServices = 5;

  currentPageHistory = 1;
  itemsPerPageHistory = 5;

  editingId: number | null = null;
  editedName = '';

  constructor(private siService: SiServiceService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  fetchServices(): void {
    this.siService.getAllServices().subscribe({
      next: data => {
        this.services = data.filter(s => !s.dateSuppression);
        this.history = data.filter(s => s.dateSuppression);
        this.filterServices();
        this.filterHistory();
      },
      error: err => {
        console.error('Erreur chargement des services', err);
        Swal.fire('Erreur', 'Erreur lors du chargement des services', 'error');
      }
    });
  }

  addService(): void {
    if (!this.newServiceName.trim()) return;
    const newItem = { nom: this.newServiceName };

    this.siService.addService(newItem).subscribe({
      next: () => {
        this.newServiceName = '';
        this.showAddForm = false;
        Swal.fire('Succès', 'Service ajouté avec succès.', 'success');
        this.fetchServices();
      },
      error: err => {
        console.error('Erreur ajout', err);
        Swal.fire('Erreur', 'Erreur lors de l’ajout du service.', 'error');
      }
    });
  }

  deleteService(id: number): void {
    Swal.fire({
      title: 'Supprimer ce service ?',
      text: 'Le service sera déplacé dans l’historique.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.siService.deleteService(id).subscribe({
          next: () => {
            Swal.fire('Supprimé', 'Le service a été supprimé.', 'success');
            this.fetchServices();
          },
          error: err => {
            console.error('Erreur suppression :', err);
            Swal.fire('Erreur', 'Impossible de supprimer le service.', 'error');
          }
        });
      }
    });
  }

  startEdit(service: ServiceIntern): void {
    this.editingId = service.id;
    this.editedName = service.nom;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editedName = '';
  }

  confirmEdit(service: { id: number, nom: string }): void {
    if (!service.nom.trim()) return;
    this.siService.updateService(service.id, service.nom).subscribe({
      next: () => {
        Swal.fire('Modifié', 'Service modifié avec succès.', 'success');
        this.editingId = null;
        this.fetchServices();
      },
      error: err => {
        console.error('Erreur modification :', err);
        Swal.fire('Erreur', 'Erreur lors de la modification.', 'error');
      }
    });
  }

  restoreService(id: number): void {
    Swal.fire({
      title: 'Restaurer ce service ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, restaurer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.siService.restoreServiceById(id).subscribe({
          next: () => {
            Swal.fire('Restauré', 'Le service a été restauré.', 'success');
            this.fetchServices();
          },
          error: err => {
            console.error('Erreur restauration :', err);
            Swal.fire('Erreur', 'Impossible de restaurer ce service.', 'error');
          }
        });
      }
    });
  }

  filterServices(): void {
    this.filteredServices = this.services.filter(service =>
      service.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPageServices = 1;
    this.updatePaginatedServices();
  }

  filterHistory(): void {
    this.filteredHistory = this.history.filter(h =>
      h.nom.toLowerCase().includes(this.searchHistory.toLowerCase())
    );
    this.currentPageHistory = 1;
    this.updatePaginatedHistory();
  }

  updatePaginatedServices(): void {
    const start = (this.currentPageServices - 1) * this.itemsPerPageServices;
    const end = start + this.itemsPerPageServices;
    this.paginatedServices = this.filteredServices.slice(start, end);
  }

  updatePaginatedHistory(): void {
    const start = (this.currentPageHistory - 1) * this.itemsPerPageHistory;
    const end = start + this.itemsPerPageHistory;
    this.paginatedHistory = this.filteredHistory.slice(start, end);
  }

  changeItemsPerPage(type: 'services' | 'history') {
    if (type === 'services') {
      this.currentPageServices = 1;
      this.updatePaginatedServices();
    } else {
      this.currentPageHistory = 1;
      this.updatePaginatedHistory();
    }
  }

  previousPage(type: 'services' | 'history') {
    if (type === 'services' && this.currentPageServices > 1) {
      this.currentPageServices--;
      this.updatePaginatedServices();
    } else if (type === 'history' && this.currentPageHistory > 1) {
      this.currentPageHistory--;
      this.updatePaginatedHistory();
    }
  }

  nextPage(type: 'services' | 'history') {
    if (type === 'services' && this.currentPageServices < this.totalPagesServices) {
      this.currentPageServices++;
      this.updatePaginatedServices();
    } else if (type === 'history' && this.currentPageHistory < this.totalPagesHistory) {
      this.currentPageHistory++;
      this.updatePaginatedHistory();
    }
  }

  get totalPagesServices(): number {
    return Math.ceil(this.filteredServices.length / this.itemsPerPageServices);
  }

  get totalPagesHistory(): number {
    return Math.ceil(this.filteredHistory.length / this.itemsPerPageHistory);
  }
}