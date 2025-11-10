import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Confidentialite {
  id: number;
  nom: string;
  code: string;
   dateCreation?: string| null;      
  dateSuppression?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SiConfidService {
  private readonly apiBase = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les confidentialités actives
  getAll(): Observable<Confidentialite[]> {
    return this.http.get<Confidentialite[]>(`${this.apiBase}/confidentialites`);
  }

  // Récupérer l'historique (supposé être un autre endpoint ou filtré côté backend)
  getDeleted(): Observable<Confidentialite[]> {
    return this.http.get<Confidentialite[]>(`${this.apiBase}/confidentialites/supprimes`);
  }

  // Ajouter
  create(confid: { nom: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiBase}/confidentialites`, confid, { responseType: 'text' });
  }

  // Modifier
update(confid: Confidentialite): Observable<any> {
  return this.http.put(
    `${this.apiBase}/confidentialite/update/${confid.id}?nom=${encodeURIComponent(confid.nom)}`,
    {},
    { responseType: 'text' }
  );
}


  // Supprimer (soft delete)
  delete(id: number): Observable<any> {
    return this.http.put(`${this.apiBase}/delete/confidentialite/${id}`, {}, { responseType: 'text' });
  }

  // Restaurer une confidentialité
   restore(id: number): Observable<any> {
    return this.http.put(`${this.apiBase}/confidentialite/restore/${id}`, {}, { responseType: 'text' });
  }
}
