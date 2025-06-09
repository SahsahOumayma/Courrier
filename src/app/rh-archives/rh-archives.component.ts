
   // src/app/rh-archives/rh-archives.component.ts
import { Component }     from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

 sidebarOpen = true;
 constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
   showConsulter = false;

  toggleConsulter() {
    this.showConsulter = !this.showConsulter;
  }
  ngAfterViewInit() {
    feather.replace()  // remplace tous les <i data-feather> par du SVG
  }
   deconnexion(): void {
    localStorage.clear();             // Efface les données de session
    this.router.navigateByUrl('/');   // Redirection vers page login
  }
}