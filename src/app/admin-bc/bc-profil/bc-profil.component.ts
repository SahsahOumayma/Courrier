import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-bc-profil',
  templateUrl: './bc-profil.component.html',
   imports: [CommonModule],
  styleUrls: ['./bc-profil.component.css']
})
export class BcProfilComponent implements AfterViewInit {
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
