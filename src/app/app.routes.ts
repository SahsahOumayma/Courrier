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
import { AdminBcComponent } from './admin-bc/admin-bc.component';
import { BcDashboardComponent } from './admin-bc/bc-dashboard/bc-dashboard.component';
import { EnrArriveeComponent } from './admin-bc/enr-arrivee/enr-arrivee.component';
import { EnrDepartComponent } from './admin-bc/enr-depart/enr-depart.component';
import { ConsArriveeComponent } from './admin-bc/cons-arrivee/cons-arrivee.component';
import { ConsDepartComponent } from './admin-bc/cons-depart/cons-depart.component';
import { BcStatistiqueComponent } from './admin-bc/bc-statistique/bc-statistique.component';
import { BcProfilComponent } from './admin-bc/bc-profil/bc-profil.component';
import { AdminSiComponent } from './admin-si/admin-si.component';
import { SiDashboardComponent } from './admin-si/si-dashboard/si-dashboard.component';
import { SiProfilComponent } from './admin-si/si-profil/si-profil.component';
import { SiUserGestionComponent } from './admin-si/si-user-gestion/si-user-gestion.component';
import { SiUserActivationComponent } from './admin-si/si-user-activation/si-user-activation.component';





export const routes: Routes = [
  { path: '',            component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'arrivee/details/:numero', component: CourrierDetailsComponent },

{
  path: 'depart/details/:numero',
  component: CourrierDepartDetailsComponent
},
{
    path: 'admin-si',
    component: AdminSiComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SiDashboardComponent },
       { path: 'profil', component: SiProfilComponent },
       { path: 'gestion', component: SiUserGestionComponent },
       { path: 'activation', component: SiUserActivationComponent }
    ]
  },

{
  path: 'admin-bc',
  component: AdminBcComponent,
  children: [
    { path: 'dashboard', component: BcDashboardComponent },
    { path: 'enregistrer-arrivee', component: EnrArriveeComponent },
    { path: 'enregistrer-depart', component: EnrDepartComponent },
    { path: 'consulter-arrivee', component: ConsArriveeComponent },
    { path: 'consulter-depart', component: ConsDepartComponent },
    { path: 'statistiques', component: BcStatistiqueComponent },
    { path: 'profil', component: BcProfilComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},

 {
  path: 'rh',
  component: RhArchivesComponent, // ← le layout contenant la sidebar et <router-outlet>
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirection par défaut vers dashboard
    { path: 'dashboard', component: RhDashboardComponent },
    { path: 'archives', component: ArchivesComponent },
    { path: 'utilisateurs', component: RhUtilisateursComponent },
    { path: 'profil', component: ProfilComponent},
    
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

