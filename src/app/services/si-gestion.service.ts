import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UtilisateurDTO {
  id: number;
  fullName: string;
  email: string;
  role: string;
  service: string;
  active: boolean;
  checkEmail: boolean;
  dateSuppression?: string | null;
}

export interface RoleDTO {
  nom: string;
  dateSuppression?: string | null;
}

export interface ServiceDTO {
  id: number;
  nom: string;
   dateSuppression?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SiGestionService {
  private readonly apiUrl = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  getUtilisateursActifs(): Observable<UtilisateurDTO[]> {
    return this.http.get<UtilisateurDTO[]>(`${this.apiUrl}/users/active`);
  }

  getRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(`${this.apiUrl}/roles`);
  }

  getServices(): Observable<ServiceDTO[]> {
    return this.http.get<ServiceDTO[]>(`${this.apiUrl}/services`);
  }

  modifierUtilisateur(dto: {
    id: number;
    role: string;
    serviceId: number;
    active: boolean;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/modify`, dto, { responseType: 'text' });
  }

  supprimerUtilisateur(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/user/${id}`);
  }
  getUtilisateursSupprimes(): Observable<UtilisateurDTO[]> {
  return this.http.get<UtilisateurDTO[]>(`${this.apiUrl}/users/deleted`);
}

restaurerUtilisateur(id: number): Observable<string> {
  return this.http.put(`${this.apiUrl}/restore/user/${id}`, {}, { responseType: 'text' });
}
}
