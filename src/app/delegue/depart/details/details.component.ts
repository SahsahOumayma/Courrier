import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courrier-depart-details',
  standalone: true,
  templateUrl: './details.component.html',
})
export class CourrierDepartDetailsComponent {
  courrier: any;
  today = new Date().toLocaleDateString('fr-FR');
  reference = 'REF-' + Date.now();

  constructor(private route: ActivatedRoute, private location: Location) {
    const nav = window.history.state;
    this.courrier = nav.courrier || {};
  }

  goBack() {
    this.location.back();
  }
}
