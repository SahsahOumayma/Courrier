import { Component, AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';
import { RouterModule } from '@angular/router';
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

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUtilisateurs(): void {
    this.showUtilisateurs = !this.showUtilisateurs;
  }

  ngAfterViewInit(): void {
    feather.replace();
  }
}
