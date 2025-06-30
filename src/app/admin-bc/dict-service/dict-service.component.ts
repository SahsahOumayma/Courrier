import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { ServiceIntern, SiServiceService } from '../../services/si-service.service';

@Component({
  selector: 'app-dict-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dict-service.component.html',
  styleUrls: ['./dict-service.component.css']
})
export class DictServiceComponent implements OnInit, AfterViewInit {
  services: ServiceIntern[] = [];
  deletedServices: ServiceIntern[] = [];

  filteredServices: ServiceIntern[] = [];
  filteredDeleted: ServiceIntern[] = [];

  paginatedServices: ServiceIntern[] = [];
  paginatedDeleted: ServiceIntern[] = [];

  currentPage = 1;
  deletedPage = 1;
  itemsPerPage = 5;
  itemsPerPageDeleted = 5;
  paginationOptions = [5, 10, 20];

  searchTerm = '';
  searchDeleted = '';

  showAddForm = false;
  newServiceName = '';
  editingService: ServiceIntern | null = null;
  showEditModal = false;

  constructor(private siService: SiServiceService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggleAddForm(): void {
    if (this.showAddForm && !this.editingService) {
      this.resetForm();
    } else {
      this.showAddForm = !this.showAddForm;
    }
  }

  resetForm(): void {
    this.newServiceName = '';
    this.editingService = null;
    this.showAddForm = false;
    this.showEditModal = false;
  }

  addOrEditService(): void {
    const nom = this.newServiceName.trim();
    if (!nom) return;

    if (this.editingService) {
      this.siService.updateService(this.editingService.id, nom).subscribe({
        next: () => {
          Swal.fire('Succès', 'Service modifié avec succès.', 'success');
          this.resetForm();
          this.fetchServices();
        },
        error: () => Swal.fire('Erreur', 'Échec de la modification.', 'error')
      });
    } else {
      this.siService.addService({ nom }).subscribe({
        next: () => {
          Swal.fire('Succès', 'Service ajouté avec succès.', 'success');
          this.resetForm();
          this.fetchServices();
        },
        error: () => Swal.fire('Erreur', 'Erreur lors de l’ajout.', 'error')
      });
    }
  }

  editService(service: ServiceIntern): void {
    this.editingService = { ...service };
    this.newServiceName = service.nom;
    this.showEditModal = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  saveService(): void {
    if (!this.editingService) return;
    const nom = this.newServiceName.trim();
    if (!nom) return;

    this.siService.updateService(this.editingService.id, nom).subscribe({
      next: () => {
        Swal.fire('Succès', 'Service modifié avec succès.', 'success');
        this.resetForm();
        this.fetchServices();
      },
      error: () => Swal.fire('Erreur', 'Échec de la modification.', 'error')
    });
  }

  deleteService(id: number): void {
    Swal.fire({
      title: 'Supprimer ce service ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then(result => {
      if (result.isConfirmed) {
        this.siService.deleteService(id).subscribe({
          next: () => {
            Swal.fire('Supprimé', 'Le service a été supprimé.', 'success');
            this.fetchServices();
          },
          error: () => Swal.fire('Erreur', 'Suppression échouée.', 'error')
        });
      }
    });
  }

  restoreService(id: number): void {
    this.siService.restoreServiceById(id).subscribe({
      next: () => {
        Swal.fire('Restauré', 'Le service a été restauré.', 'success');
        this.fetchServices();
      },
      error: () => Swal.fire('Erreur', 'Échec de la restauration.', 'error')
    });
  }

  fetchServices(): void {
    this.siService.getAllServices().subscribe({
      next: data => {
        this.services = data.filter(s => !s.dateSuppression);
        this.deletedServices = data.filter(s => s.dateSuppression);
        this.applyFilter();
        this.applyFilterDeleted();
      },
      error: err => {
        Swal.fire('Erreur', 'Erreur lors du chargement des services', 'error');
        console.error(err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredServices = this.services.filter(s => s.nom.toLowerCase().includes(term));
    this.currentPage = 1;
    this.updatePaginatedServices();
  }

  applyFilterDeleted(): void {
    const term = this.searchDeleted.toLowerCase();
    this.filteredDeleted = this.deletedServices.filter(s => s.nom.toLowerCase().includes(term));
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  updatePaginatedServices(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedServices = this.filteredServices.slice(start, start + this.itemsPerPage);
  }

  updatePaginatedDeleted(): void {
    const start = (this.deletedPage - 1) * this.itemsPerPageDeleted;
    this.paginatedDeleted = this.filteredDeleted.slice(start, start + this.itemsPerPageDeleted);
  }

  totalPages(): number {
    return Math.ceil(this.filteredServices.length / this.itemsPerPage);
  }

  totalDeletedPages(): number {
    return Math.ceil(this.filteredDeleted.length / this.itemsPerPageDeleted);
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.updatePaginatedServices();
  }

  changeItemsPerPageDeleted(): void {
    this.deletedPage = 1;
    this.updatePaginatedDeleted();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedServices();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedServices();
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
}
