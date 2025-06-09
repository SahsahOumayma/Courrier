import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  standalone: true,
  selector: 'app-res-svc',
  templateUrl: './res-svc.component.html',
  imports: [
    CommonModule,
    RouterModule
    // … ajoutez ici d’autres modules si besoin (ex: FormsModule)
  ]
})
export class ResSvcComponent implements AfterViewInit {
  showConsulter = false;
  sidebarOpen = true;
    constructor(private router: Router) {} 

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngAfterViewInit() {
    feather.replace(); // remplace les icônes au premier chargement
  }

  toggleConsulter() {
    this.showConsulter = !this.showConsulter;
    // un petit délai pour laisser Angular injecter le <ul> dans le DOM…
    setTimeout(() => feather.replace(), 0);
  }
   deconnexion(): void {
    localStorage.clear(); // Supprime le token ou session
    this.router.navigateByUrl('/'); // Redirige vers la page d'accueil ou login
  }
}
