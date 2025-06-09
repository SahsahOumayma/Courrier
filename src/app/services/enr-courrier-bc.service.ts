import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
      responseType: 'text' as const // ✅ réponse texte
    });
  }

  /**
   * Envoi d’un courrier de départ
   */
  envoyerCourrierDepart(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/depart`, formData, {
      responseType: 'text' as const // ✅ réponse texte
    });
  }

  /**
   * Récupération des listes
   */
 getOptionsAjoutCourrier() {
  return this.http.get<{
    urgences: any[],
    confidentialites: any[],
    services: any[]
  }>('http://localhost:9090/api/admin-bc/admin/courriers/arrivee');
}

 envoyerCourrierEmploye(formData: FormData): Observable<string> {
    return this.http.post('http://localhost:9090/api/admin-bc/courrier/employe', formData, {
      responseType: 'text' as const
    });
  }

  getStaticOptions(): Observable<{ employes: any[] }> {
    return this.http.get<{ employes: any[] }>('http://localhost:9090/api/admin-bc/courrier/employe');
  }

}

