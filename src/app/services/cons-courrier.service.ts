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
}
