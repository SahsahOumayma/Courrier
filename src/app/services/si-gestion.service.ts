import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UtilisateurDTO {
  id: number;
  fullName: string;
  email: string;
  role: string;
  service: string;
  active: boolean;
  checkEmail: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiGestionService {
  private readonly apiUrl = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  getUtilisateursActifs(): Observable<UtilisateurDTO[]> {
    return this.http.get<UtilisateurDTO[]>(`${this.apiUrl}/users/active`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  modifierUtilisateur(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/modify`, dto, { responseType: 'text' });
  }

  supprimerUtilisateur(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/user/${id}`);
  }
}
