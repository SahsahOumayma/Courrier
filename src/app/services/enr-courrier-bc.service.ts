import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrCourrierBcService {
  private apiUrl = 'http://localhost:9090/api/admin-bc/admin/courriers';

  constructor(private http: HttpClient) {}

  /**
   * Envoi d’un courrier d’arrivée
   */
  envoyerCourrierArrivee(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/arrivee`, formData, {
      responseType: 'text' as const
    });
  }

  /**
   * Envoi d’un courrier de départ
   */
  envoyerCourrierDepart(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/depart`, formData, {
      responseType: 'text' as const
    });
  }

  /**
   * Récupération des listes (urgences, services, confidentialités)
   */
  getOptionsAjoutCourrier(): Observable<{
    urgences: any[],
    confidentialites: any[],
    services: any[]
  }> {
    return this.http.get<{
      urgences: any[],
      confidentialites: any[],
      services: any[]
    }>(`${this.apiUrl}/arrivee`);
  }

  /**
   * Envoi pour employé (si utilisé ailleurs)
   */
  envoyerCourrierEmploye(formData: FormData): Observable<string> {
    return this.http.post('http://localhost:9090/api/admin-bc/courrier/employe', formData, {
      responseType: 'text' as const
    });
  }

  /**
   * Récupération des employés (optionnel selon ton besoin)
   */
  getStaticOptions(): Observable<{ employes: any[] }> {
    return this.http.get<{ employes: any[] }>('http://localhost:9090/api/admin-bc/courrier/employe');
  }
  

}
