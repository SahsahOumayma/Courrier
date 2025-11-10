import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ServiceIntern {
  id: number;
  nom: string;
  dateCreation: string;
  dateSuppression?: string | null;
}

export interface HistoryItem {
  action: string;
  nomService: string;
  dateAction: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiServiceService {
  // ✅ Utilise l'URL complète pour éviter les erreurs si pas de proxy
  private baseUrl = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  // ✅ Obtenir tous les services
  getAllServices(): Observable<ServiceIntern[]> {
    return this.http.get<ServiceIntern[]>(`${this.baseUrl}/services`);
  }

  // ✅ Ajouter un service
  addService(service: { nom: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/services`, service, { responseType: 'text' });
  }

  // ✅ Supprimer (soft) un service
  deleteService(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/service/${id}/delete`, {}, { responseType: 'text' });
  }

   getServiceHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.baseUrl}/services/history`);
  }

  restoreServiceById(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/services/restore/${id}`, {}, { responseType: 'text' });
  }
  updateService(id: number, nom: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/service/update/${id}?nom=${encodeURIComponent(nom)}`, {}, { responseType: 'text' });
}



}
