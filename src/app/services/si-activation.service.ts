import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiActivationService {
  private baseUrl = 'http://localhost:9090/api/admin-si';

  constructor(private http: HttpClient) {}

  getToActivateUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/to-activate`);
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roles`);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }

  activerUtilisateur(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/activate`, payload, { responseType: 'text' });
  }

  deleteUser(id: number): Observable<any> {
  return this.http.delete(`http://localhost:9090/api/admin-si/delete/user/${id}`, {
    responseType: 'text',
  });
}
}
