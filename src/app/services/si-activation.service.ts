import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminSIUserDTO {
  id: number;
  fullName: string;
  email: string;
  login: string;
  role: string | null;
  service: string | null;
  active: boolean;
  checkEmail: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiActivationService {
  private apiUrl = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  // Liste des utilisateurs à activer
  getUsersToActivate(): Observable<AdminSIUserDTO[]> {
    return this.http.get<AdminSIUserDTO[]>(`${this.apiUrl}/users/to-activate`);
  }

  // Récupérer les rôles disponibles
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  // Récupérer les services disponibles
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  // Récupérer les comptes inactifs (même endpoint que getUsersToActivate pour compatibilité)
  getComptesInactifs(): Observable<AdminSIUserDTO[]> {
    return this.http.get<AdminSIUserDTO[]>(`${this.apiUrl}/users/to-activate`);
  }

  // Activer un utilisateur avec FormData (POST multipart)
  // Envoie bien un JSON
activateUser(payload: {
  id: number;
  role: string;
  serviceId: number;
  active: boolean;
}): Observable<string> {
  return this.http.post(`${this.apiUrl}/users/activate`, payload, {
    responseType: 'text' as const
  });
}

}


