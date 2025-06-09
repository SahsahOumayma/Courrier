import { Component, AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-si',
  standalone: true, // ← Important pour standalone
  imports: [CommonModule, RouterModule], // ← Ajoute les modules nécessaires ici
  templateUrl: './admin-si.component.html',
  styleUrls: ['./admin-si.component.css']
})
export class AdminSiComponent implements AfterViewInit {

  sidebarOpen: boolean = true;
  showUtilisateurs: boolean = false;
  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUtilisateurs(): void {
  this.showUtilisateurs = !this.showUtilisateurs;

  // Relancer feather icons après apparition du sous-menu
  setTimeout(() => {
    feather.replace();
  }, 0);
}


  ngAfterViewInit(): void {
    feather.replace();
  }
  deconnexion(): void {
    localStorage.clear(); // ✅ Supprime les données de session
    this.router.navigateByUrl('/'); // ✅ Redirige vers login
  }
}
