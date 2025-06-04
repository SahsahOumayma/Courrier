import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvcArrivService {
  private baseUrl = 'http://localhost:9090/api/responsable-svc';

  constructor(private http: HttpClient) {}

  // 📥 Récupérer les courriers d'arrivée en cours
  getArriveeEnCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courriers/arrivee/encours`);
  }

  // 📥 Récupérer les courriers d'arrivée archivés
  getArriveeArchive() {
  return this.http.get<any[]>('http://localhost:9090/api/responsable-svc/courriers/arrivee/archives');
}

 getDepartEnCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courriers/depart/encours`);
  }

  getDepartArchive(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/courriers/depart/archives`);
}


  // 🔄 Mettre à jour le statut d’un courrier d’arrivée
  updateStatutCourrier(data: {
    courrierId: number;
    newStatus: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/courriers/update-status`, data, {
      responseType: 'text' as const
    });
  }
}
