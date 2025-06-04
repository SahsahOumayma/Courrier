import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ POUR ngModel
import feather from 'feather-icons';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ✅ Ajout FormsModule ici
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements AfterViewChecked {

  ongletActif: string = 'info';
user = {
  nomComplet: '',
  email: '',
  telephone: '',
  departement: '',
  role: '' // <-- Champ pour saisir manuellement le rôle
};

  preferences = {
    email: true,
    sms: false,
    push: true
  };

  changerOnglet(nom: string): void {
    this.ongletActif = nom;
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
