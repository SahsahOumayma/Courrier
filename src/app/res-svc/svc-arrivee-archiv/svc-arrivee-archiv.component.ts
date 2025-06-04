import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Ajout ici
import { FormsModule } from '@angular/forms'; // si tu utilises [(ngModel)]
import { SvcArrivService } from '../../services/svc-arriv.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-svc-arrivee-archiv',
  standalone: true, // si tu es en standalone
  imports: [CommonModule, FormsModule], // <-- Ajoute ici
  templateUrl: './svc-arrivee-archiv.component.html',
  styleUrls: ['./svc-arrivee-archiv.component.css']
})
export class SvcArriveeArchivComponent implements OnInit {
  courriers: any[] = [];
  courriersFiltres: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private svcArrivService: SvcArrivService) {}

  ngOnInit(): void {
    this.chargerCourriersArchives();
  }

  chargerCourriersArchives(): void {
    this.loading = true;

    this.svcArrivService.getArriveeArchive().subscribe({
      next: (data) => {
        this.courriers = data;
        this.courriersFiltres = [...this.courriers];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des courriers archivés :', err);
        this.courriers = [];
        this.courriersFiltres = [];
        this.loading = false;
      }
    });
  }

  filtrerCourriers(): void {
    const query = this.searchTerm.trim().toLowerCase();
    this.courriersFiltres = this.courriers.filter(c =>
      (c.objet && c.objet.toLowerCase().includes(query)) ||
      (c.signataire && c.signataire.toLowerCase().includes(query)) ||
      (c.urgence && c.urgence.toLowerCase().includes(query))
    );
  }
   ngAfterViewChecked(): void {
      feather.replace();
    }
}
