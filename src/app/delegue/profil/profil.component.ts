import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'], // facultatif
  imports: [CommonModule, RouterModule]
})
export class ProfilComponent {
  ongletActif: 'info' | 'securite' | 'preferences' = 'info';
  showCourrier = false;

  changerOnglet(onglet: 'info' | 'securite' | 'preferences') {
    this.ongletActif = onglet;
  }

  toggleMenu(menu: string) {
    if (menu === 'courrier') {
      this.showCourrier = !this.showCourrier;
    }
  }
}
