import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsCourrierService {
  private baseUrl = 'http://localhost:9090/api/admin-bc';

  constructor(private http: HttpClient) {}

  getCourriersArrivee(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courriers/arrivees`);
  }
  getCourriersDepart(): Observable<any> {
  return this.http.get(`${this.baseUrl}/courriers/departs`);
}
  getStaticOptions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/static-options`);
  }

  updateCourrier(courrier: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/courriers/update`, courrier);
  }

  archiverCourrier(id: number): Observable<any> {
   return this.http.put(`${this.baseUrl}/courrier/archiver/${id}`, null, { responseType: 'text' });

  }
  getOptionsDepart(): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/courriers/depart`);
}
}

