import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
 updateStatutCourrier(payload: { courrierId: number, newStatus: string }) {
  return this.http.post(`${this.baseUrl}/courriers/update-status`, payload, {
    responseType: 'text' // ✅ indique que c'est du texte, pas du JSON
  });
}

}
