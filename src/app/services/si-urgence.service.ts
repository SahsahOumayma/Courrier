import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Urgence {
  id: number;
  nom: string;
}

@Injectable({ providedIn: 'root' })
export class SiUrgenceService {
  private baseUrl = 'http://localhost:9090/api/admin-si/urgences';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Urgence[]> {
    return this.http.get<Urgence[]>(this.baseUrl);
  }

  create(urgence: Partial<Urgence>): Observable<any> {
    return this.http.post(this.baseUrl, urgence);
  }

  update(urgence: Urgence): Observable<any> {
    return this.http.put(`${this.baseUrl}/${urgence.id}`, urgence);
  }

  delete(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
