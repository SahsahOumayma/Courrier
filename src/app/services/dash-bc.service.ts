import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBcService {
  private apiUrl = 'http://localhost:9090/api/admin-bc/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get('http://localhost:9090/api/admin-bc/dashboard');
  }
}
