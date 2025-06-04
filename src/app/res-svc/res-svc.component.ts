import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
}
