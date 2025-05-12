import { Routes } from '@angular/router';
import { ConnexionComponent }   from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DelegueComponent }     from './delegue/delegue.component';
import { ArriveeComponent }     from './delegue/arrivee/arrivee.component';
import { DepartComponent }      from './delegue/depart/depart.component';
import { CourrierDetailsComponent } from './courrier-details/courrier-details.component'
import { DashboardComponent } from './delegue/dashboard/dashboard.component'; 
import { CourrierDepartDetailsComponent } from './delegue/depart/details/details.component';



export const routes: Routes = [
  { path: '',            component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'arrivee/details/:numero', component: CourrierDetailsComponent },

{
  path: 'depart/details/:numero',
  component: CourrierDepartDetailsComponent
},

  {
    path: 'delegue',
    component: DelegueComponent,
    children: [
      { path: '',        component: ArriveeComponent },    // /delegue
      { path: 'arrivee', component: ArriveeComponent },    // /delegue/arrivee
      { path: 'depart',  component: DepartComponent   } ,
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },   // /delegue/depart
    ]
  },
  {
  path: 'dashboard',
  component: DashboardComponent
},

  { path: '**', redirectTo: '' }
];
