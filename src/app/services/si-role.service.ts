import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Role {
  id: number;
  nom: string;
  dateCreation?: string | null;
  dateSuppression?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SiRoleService {
  private readonly apiBase: string = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  // ✅ Récupérer tous les rôles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiBase}/roles`);
  }


  // ✅ Ajouter un nouveau rôle
  createRole(role: Partial<Role>): Observable<any> {
    return this.http.post(`${this.apiBase}/roles`, role, { responseType: 'text' });
  }
   deleteRole(id: number): Observable<any> {
    return this.http.put(`${this.apiBase}/delete/role/${id}`, {}, { responseType: 'text' });
  }
  updateRole(role: Role): Observable<any> {
  return this.http.put(
    `${this.apiBase}/role/update/${role.id}?nom=${encodeURIComponent(role.nom)}`,
    {},
    { responseType: 'text' }
  );
}

 restoreRole(id: number): Observable<any> {
    return this.http.put(`${this.apiBase}/role/restore/${id}`, {}, { responseType: 'text' });
  }
}
