import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  id: number;
  nom: string;
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

  // ✅ Mettre à jour un rôle
  updateRole(role: Role): Observable<any> {
    return this.http.put(`${this.apiBase}/roles/${role.id}`, role, { responseType: 'text' });
  }

  // ✅ Supprimer un rôle avec l’endpoint correct
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiBase}/delete/role/${id}`, { responseType: 'text' });
  }

  // ✅ Ajouter un nouveau rôle
  createRole(role: Partial<Role>): Observable<any> {
    return this.http.post(`${this.apiBase}/roles`, role, { responseType: 'text' });
  }
}
