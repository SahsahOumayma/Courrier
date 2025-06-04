import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Confidentialite {
  id: number;
  nom: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiConfidService {
  private readonly apiBase = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les confidentialités
  getAll(): Observable<Confidentialite[]> {
    return this.http.get<Confidentialite[]>(`${this.apiBase}/confidentialites`);
  }

  // Créer une nouvelle
  create(confid: { nom: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiBase}/confidentialites`, confid, { responseType: 'text' });
  }

  // Mettre à jour
  update(confid: Confidentialite): Observable<any> {
    return this.http.put(`${this.apiBase}/confidentialites/${confid.id}`, confid, { responseType: 'text' });
  }

  // Supprimer
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiBase}/delete/confidentialite/${id}`, { responseType: 'text' });
  }
}
