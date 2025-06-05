import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvcDashService {
  private apiUrl = 'http://localhost:9090/api/responsable-svc';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/dashboard`);
}

}
