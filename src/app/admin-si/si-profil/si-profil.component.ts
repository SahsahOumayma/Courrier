import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-si-profil',
  imports: [CommonModule],
  templateUrl: './si-profil.component.html',
  styleUrl: './si-profil.component.css'
})
export class SiProfilComponent implements AfterViewInit {
  ongletActif: 'info' | 'securite' | 'preferences' = 'info';
  showCourrier = false;

  changerOnglet(onglet: 'info' | 'securite' | 'preferences') {
    this.ongletActif = onglet;

    // Important : attendre que le DOM soit mis à jour avant de remplacer les icônes
    setTimeout(() => {
      feather.replace();
    }, 0);
  }

  toggleMenu(menu: string) {
    if (menu === 'courrier') {
      this.showCourrier = !this.showCourrier;
    }
  }

  // Lors du premier affichage
  ngAfterViewInit() {
    feather.replace();
  }
}
