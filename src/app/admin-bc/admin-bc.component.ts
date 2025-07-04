import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-admin-bc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-bc.component.html',
  styleUrls: ['./admin-bc.component.css']
})
export class AdminBcComponent implements AfterViewInit {
  sidebarOpen = true;
  showEnregistrer = false;
  showConsulter = false;
    constructor(private router: Router) {}

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
  showDictionnaire: boolean = false;

toggleDictionnaire() {
  this.showDictionnaire = !this.showDictionnaire;
  setTimeout(() => feather.replace(), 0); // recharge les icônes après toggle
}


  ngAfterViewInit(): void {
    feather.replace(); // première initialisation
  }
  deconnexion(): void {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  
}
