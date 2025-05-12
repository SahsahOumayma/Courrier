import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courrier-details',
  imports: [],
  templateUrl: './courrier-details.component.html',
  styleUrl: './courrier-details.component.css'
})
export class CourrierDetailsComponent {
  courrier: any;
  today = new Date().toLocaleDateString('fr-FR');
reference = 'REF-' + new Date().getTime();

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    this.courrier = navigation?.extras?.state?.['courrier'];

    if (!this.courrier) {
      this.router.navigate(['/arrivee']); // si l'utilisateur recharge la page
    }
  }

}
