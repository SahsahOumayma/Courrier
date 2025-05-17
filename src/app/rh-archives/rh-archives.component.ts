
   // src/app/rh-archives/rh-archives.component.ts
import { Component }     from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { FormsModule }   from '@angular/forms';
import * as feather from 'feather-icons';
import { AfterViewInit } from '@angular/core';

interface Courrier {
  id: number;
  objet: string;
  expediteur: string;
  dateArchivage: string;
  employe: string;
  service: string;
  statut: string;
}

@Component({
  selector: 'app-rh-archives',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  templateUrl: './rh-archives.component.html'
})
export class RhArchivesComponent implements AfterViewInit {

 sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  // données d’exemple
  courriers: Courrier[] = [
    { id: 1, objet: 'Demande congé',      expediteur: 'Dupont',   dateArchivage: '01/05/2025', employe: 'Dupont',   service: 'RH', statut: 'Archivé' },
    { id: 2, objet: 'Note de service',    expediteur: 'Martin',   dateArchivage: '05/05/2025', employe: 'Martin',   service: 'Direction', statut: 'Archivé' },
    { id: 3, objet: 'Rapport annuel',     expediteur: 'Leblanc',  dateArchivage: '10/05/2025', employe: 'Leblanc',  service: 'Finance', statut: 'Archivé' },
  ];

  // pour le tri et le filtre
  selectedTri: 'dateArchivage' | 'alphabetique' | 'service' = 'dateArchivage';
  filtreStatut: 'tous' | 'Archivé' | 'En cours' | 'À traiter' = 'tous';

  trierCourriers() {
    if (this.selectedTri === 'alphabetique') {
      this.courriers.sort((a, b) => a.objet.localeCompare(b.objet));
    } else if (this.selectedTri === 'service') {
      this.courriers.sort((a, b) => a.service.localeCompare(b.service));
    } else {
      this.courriers.sort((a, b) =>
        new Date(b.dateArchivage).getTime() - new Date(a.dateArchivage).getTime()
      );
    }
  }

  voirDetails(c: Courrier) {
    console.log('Voir détails de', c);
    // ici tu peux par ex. routerLink vers une page de détail
  }

  telechargerPDF(c: Courrier) {
    console.log('Télécharger PDF de', c);
    // appelle ton service d’export PDF
  }
   showConsulter = false;

  toggleConsulter() {
    this.showConsulter = !this.showConsulter;
  }
  ngAfterViewInit() {
    feather.replace()  // remplace tous les <i data-feather> par du SVG
  }
}