import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Urgence {
  id: number;
  nom: string;
  dateCreation?: Date;
  dateSuppression?: Date;
}

export interface Confidentialite {
  id: number;
  nom: string;
  dateCreation?: string | null;
  dateSuppression?: Date;
}

export interface VoieExpedition {
  id: number;
  nom: string;
  dateCreation?: string | null;
  dateSuppression?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DictionnaireService {
  private baseUrl = 'http://localhost:9090/api/admin-bc';

  constructor(private http: HttpClient) {}

  // ---- Urgence ----
  getAllUrgences(): Observable<Urgence[]> {
    return this.http.get<Urgence[]>(`${this.baseUrl}/urgences`);
  }

  addUrgence(urgence: Partial<Urgence>): Observable<any> {
    return this.http.post(`${this.baseUrl}/urgences`, urgence);
  }

  deleteUrgence(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/delete/urgence/${id}`, {});
  }

  restoreUrgence(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/urgence/restore/${id}`, {});
  }

  updateUrgence(id: number, nom: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/urgence/update/${id}?nom=${encodeURIComponent(nom)}`, {});
  }

  // ---- Confidentialité ----
  getAllConfidentialites(): Observable<Confidentialite[]> {
    return this.http.get<Confidentialite[]>(`${this.baseUrl}/confidentialites`);
  }

  addConfidentialite(conf: Partial<Confidentialite>): Observable<any> {
    return this.http.post(`${this.baseUrl}/confidentialites`, conf);
  }

  deleteConfidentialite(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/delete/confidentialite/${id}`, {});
  }

  restoreConfidentialite(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/confidentialite/restore/${id}`, {});
  }

  updateConfidentialite(id: number, nom: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/confidentialite/update/${id}?nom=${encodeURIComponent(nom)}`, {});
  }

  // ---- Voie d'expédition ----
 getAllVoies(): Observable<VoieExpedition[]> {
    return this.http.get<VoieExpedition[]>(`${this.baseUrl}/Voie`,);
  }

  addVoie(voie: Partial<VoieExpedition>): Observable<any> {
    return this.http.post(`${this.baseUrl}/Voie`, voie);
  }
deleteVoie(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/voiexpedition/delete/${id}`, {}, { responseType: 'text' });
}

restoreVoie(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/voiexpedition/restore/${id}`, {}, { responseType: 'text' });
}

updateVoie(id: number, nom: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/voiexpedition/update/${id}?nom=${encodeURIComponent(nom)}`, {}, { responseType: 'text' });

}



}