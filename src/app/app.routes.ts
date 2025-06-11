import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DelegueComponent } from './delegue/delegue.component';
import { ArriveeComponent } from './delegue/arrivee/arrivee.component';
import { DepartComponent } from './delegue/depart/depart.component';
import { CourrierDetailsComponent } from './courrier-details/courrier-details.component';
import { DashboardComponent } from './delegue/dashboard/dashboard.component';
import { CourrierDepartDetailsComponent } from './delegue/depart/details/details.component';
import { RhArchivesComponent } from './rh-archives/rh-archives.component';
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
import { SiServicesComponent } from './admin-si/si-services/si-services.component';
import { SiRolesComponent } from './admin-si/si-roles/si-roles.component';
import { SiConfidComponent } from './admin-si/si-confid/si-confid.component';
import { SiUrgenceComponent } from './admin-si/si-urgence/si-urgence.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResSvcComponent } from './res-svc/res-svc.component';
import { SvcArriveeComponent } from './res-svc/svc-arrivee/svc-arrivee.component';
import { SvcArriveeArchivComponent } from './res-svc/svc-arrivee-archiv/svc-arrivee-archiv.component';
import { SvcDepartComponent } from './res-svc/svc-depart/svc-depart.component';
import { SvcDepartArchivComponent } from './res-svc/svc-depart-archiv/svc-depart-archiv.component';
import { PasswordComponent } from './password/password.component';
import { SvcProfilComponent } from './res-svc/svc-profil/svc-profil.component';
import { RhProfilComponent } from './rh-archives/rh-profil/rh-profil.component';
import { SvcDashComponent } from './res-svc/svc-dash/svc-dash.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ArrivArchiveComponent } from './delegue/arriv-archive/arriv-archive.component';
import { DepartArchiveComponent } from './delegue/depart-archive/depart-archive.component';
import { EnrEmployeComponent } from './admin-bc/enr-employe/enr-employe.component';
import { ConsEmployeComponent } from './admin-bc/cons-employe/cons-employe.component';
import { ConsulEmployeComponent } from './rh-archives/consul-employe/consul-employe.component';
import { SupportDelComponent } from './delegue/support-del/support-del.component';
import { SupportBcComponent } from './admin-bc/support-bc/support-bc.component';
import { SupportSiComponent } from './admin-si/support-si/support-si.component';
import { SupportSvcComponent } from './res-svc/support-svc/support-svc.component';
import { SupportRhComponent } from './rh-archives/support-rh/support-rh.component';
import { AuthGuard } from './guards/auth.guard';












export const routes: Routes = [
  { path: '', component: ConnexionComponent, canActivate: [AuthGuard] },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'arrivee/details/:numero', component: CourrierDetailsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },

  {
    path: 'depart/details/:numero',
    component: CourrierDepartDetailsComponent,
  },
  {
    path: 'admin-si',
    component: AdminSiComponent,
    canActivate: [AuthGuard],
  data: { role: 'ADMINSI' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SiDashboardComponent },
      { path: 'profil', component: SiProfilComponent },
      { path: 'gestion', component: SiUserGestionComponent },
      { path: 'activation', component: SiUserActivationComponent },
      { path: 'services', component: SiServicesComponent },
      { path: 'roles', component: SiRolesComponent },
      { path: 'confidentialites', component: SiConfidComponent },
      { path: 'urgences', component: SiUrgenceComponent },
      { path: 'profil', component: SiProfilComponent },
       { path: 'support', component: SupportSiComponent }

    ],
  },

  {
    path: 'admin-bc',
    component: AdminBcComponent,
    canActivate: [AuthGuard],
  data: { role: 'ADMINBC' },
    children: [
      { path: 'dashboard', component: BcDashboardComponent },
      { path: 'enregistrer-arrivee', component: EnrArriveeComponent },
      { path: 'enregistrer-depart', component: EnrDepartComponent },
      { path: 'consulter-arrivee', component: ConsArriveeComponent },
      { path: 'consulter-depart', component: ConsDepartComponent },
      { path: 'enregistrer-employe', component: EnrEmployeComponent },
      { path: 'statistiques', component: BcStatistiqueComponent },
      { path: 'support', component: SupportBcComponent },
      
      {
    path: 'consulter-employe',
    component: ConsEmployeComponent
  },
      { path: 'profil', component: BcProfilComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: 'rh',
    component: RhArchivesComponent,
    canActivate: [AuthGuard],
  data: { role: 'RH' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RhDashboardComponent },
      { path: 'archives', component: ArchivesComponent },
      { path: 'utilisateurs', component: RhUtilisateursComponent },
        { path: 'courriers-employes', component: ConsulEmployeComponent },
      { path: 'profil', component: RhProfilComponent },
       { path: 'support', component: SupportRhComponent },
    ],
  },

  {
    path: 'delegue',
    component: DelegueComponent,
     canActivate: [AuthGuard],
  data: { role: 'DELEGUE' },
    children: [
      { path: '', component: DashboardComponent }, // /delegue
      { path: 'arrivee', component: ArriveeComponent }, // /delegue/arrivee
      { path: 'depart', component: DepartComponent },
      { path: 'statistique', component: StatistiqueComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
       { path: 'archive-arrivee', component: ArrivArchiveComponent },
  { path: 'archive-depart', component: DepartArchiveComponent },
  { path: 'support', component: SupportDelComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // /delegue/depart
    ],
  },

  {
    path: 'res-svc',
    component: ResSvcComponent,
    canActivate: [AuthGuard],
  data: { role: 'RESPONSABLESVC' },
    children: [
      { path: 'arrivee', component: SvcArriveeComponent },
      { path: 'arrivee-archives', component: SvcArriveeArchivComponent },
      { path: 'depart', component: SvcDepartComponent },
      { path: 'depart-archiv', component: SvcDepartArchivComponent },
      { path: 'profil', component: SvcProfilComponent },
      { path: 'dashboard', component: SvcDashComponent },
       { path: 'support', component: SupportSvcComponent },
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ],
  },

  { path: '**', redirectTo: '' },
];
