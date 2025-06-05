import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
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
  searchQuery: string = '';
  newServiceName: string = '';
  showAddForm = false;

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
        this.services = data;
        this.filteredServices = data;
      },
      error: err => console.error('Erreur chargement', err)
    });
  }

  addService(): void {
  if (!this.newServiceName.trim()) return;

  const newItem = { nom: this.newServiceName };

  console.log('Envoi vers API:', newItem);

  this.siService.addService(newItem).subscribe({
    next: () => {
      console.log('Ajout réussi !');
      this.newServiceName = '';
      this.showAddForm = false;
      this.fetchServices(); // recharge les services
    },
    error: err => {
      console.error('Erreur ajout', err);
      alert('Erreur lors de l’ajout du service.');
    }
  });
}


  deleteService(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
    this.siService.deleteService(id).subscribe({
      next: () => {
        alert('✅ Service supprimé avec succès.');
        this.fetchServices();
      },
      error: (err) => {
        console.error('❌ Erreur suppression service :', err);
        alert('Erreur lors de la suppression.');
      }
    });
  }


}


  filterServices(): void {
    this.filteredServices = this.services.filter(service =>
      service.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
