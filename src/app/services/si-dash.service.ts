// src/app/services/si-dash.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiDashService {
  private apiUrl = 'http://localhost:9090/api/admin-si/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
