import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Urgence {
  id: number;
  nom: string;
  dateCreation?: string | null;
  dateSuppression?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SiUrgenceService {
  private baseUrl = 'http://localhost:9090/api/admin-si/urgences';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Urgence[]> {
    return this.http.get<Urgence[]>(this.baseUrl);
  }

create(urgence: Partial<Urgence>): Observable<any> {
  return this.http.post(this.baseUrl, urgence, {
    responseType: 'text'
  });
}
 update(u: Urgence): Observable<any> {
  return this.http.put(
    `http://localhost:9090/api/admin-si/urgence/update/${u.id}?nom=${encodeURIComponent(u.nom)}`,
    {}, // Corps vide
    { responseType: 'text' }
  );
}


restore(id: number): Observable<any> {
  return this.http.put(
    `http://localhost:9090/api/admin-si/urgence/restore/${id}`,
    {},
    { responseType: 'text' }
  );
}

delete(id: number): Observable<any> {
  return this.http.put(
    `http://localhost:9090/api/admin-si/delete/urgence/${id}`,
    {},
    { responseType: 'text' }
  );
}


}
