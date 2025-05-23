import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-admin-bc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-bc.component.html',
  styleUrls: ['./admin-bc.component.css']
})
export class AdminBcComponent implements AfterViewInit {
  sidebarOpen = false;
  showEnregistrer = false;
  showConsulter = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      setTimeout(() => feather.replace(), 0); // recharge icônes quand menu s'ouvre
    }
  }

  toggleEnregistrer() {
    this.showEnregistrer = !this.showEnregistrer;
    setTimeout(() => feather.replace(), 0); // recharge icônes sous-menu
  }

  toggleConsulter() {
    this.showConsulter = !this.showConsulter;
    setTimeout(() => feather.replace(), 0); // recharge icônes sous-menu
  }

  ngAfterViewInit(): void {
    feather.replace(); // première initialisation
  }
}
