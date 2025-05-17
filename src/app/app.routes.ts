import { Routes } from '@angular/router';
import { ConnexionComponent }   from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DelegueComponent }     from './delegue/delegue.component';
import { ArriveeComponent }     from './delegue/arrivee/arrivee.component';
import { DepartComponent }      from './delegue/depart/depart.component';
import { CourrierDetailsComponent } from './courrier-details/courrier-details.component'
import { DashboardComponent } from './delegue/dashboard/dashboard.component'; 
import { CourrierDepartDetailsComponent } from './delegue/depart/details/details.component';
import { RhArchivesComponent }  from './rh-archives/rh-archives.component';
import { StatistiqueComponent } from './delegue/statistique/statistique.component';
import { ProfilComponent } from './delegue/profil/profil.component';
import { RhDashboardComponent } from './rh-archives/rh-dashboard/rh-dashboard.component';

import { ArchivesComponent } from './rh-archives/archives/archives.component';
import { RhUtilisateursComponent } from './rh-archives/rh-utilisateurs/rh-utilisateurs.component';



export const routes: Routes = [
  { path: '',            component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'arrivee/details/:numero', component: CourrierDetailsComponent },

{
  path: 'depart/details/:numero',
  component: CourrierDepartDetailsComponent
},
 {
  path: 'rh',
  component: RhArchivesComponent, // ← le layout contenant la sidebar et <router-outlet>
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirection par défaut vers dashboard
    { path: 'dashboard', component: RhDashboardComponent },
    { path: 'archives', component: ArchivesComponent },
    { path: 'utilisateurs', component: RhUtilisateursComponent },
    { path: 'profil', component: ProfilComponent}
  ]
},

  {
    path: 'delegue',
    component: DelegueComponent,
    children: [
      { path: '',        component: ArriveeComponent },    // /delegue
      { path: 'arrivee', component: ArriveeComponent },    // /delegue/arrivee
      { path: 'depart',  component: DepartComponent   } ,
      {path: 'statistique', component: StatistiqueComponent},
      {path: 'dashboard',component: DashboardComponent},
      {path: 'profil', component: ProfilComponent},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },   // /delegue/depart
    ]
  },
  { path: '**', redirectTo: '' }
];
