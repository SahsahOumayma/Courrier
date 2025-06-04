import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RhDashboardService {
  private apiUrl = 'http://localhost:9090/api/RH'; // à adapter selon ton environnement

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getArchivedCourriers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/archived-courriers/personnel-table`);
  }
}
