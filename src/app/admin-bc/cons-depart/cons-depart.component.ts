import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import feather from 'feather-icons';

@Component({
  selector: 'app-cons-depart',
  templateUrl: './cons-depart.component.html',
  imports: [CommonModule],
  styleUrls: ['./cons-depart.component.css']
})
export class ConsDepartComponent implements AfterViewInit {

  courriersEnCours = [
    { objet: 'Commande matériel', service: 'Logistique', date: '2025-04-30' }
  ];

  courriersArchives = [
    { objet: 'Rapport annuel', service: 'Finance', date: '2025-05-07' }
  ];

  ngAfterViewInit(): void {
    feather.replace();
  }

  traiter(courrier: any) {
    this.courriersEnCours = this.courriersEnCours.filter(c => c !== courrier);
    this.courriersArchives.push(courrier);
  }
}
