import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:9090/api/delegue/dashboard';
  private adminBcUrl = 'http://localhost:9090/api/admin-bc/stats';

  constructor(private http: HttpClient) {}

 getDashboardData(): Observable<any> {
  return this.http.get('http://localhost:9090/api/delegue/dashboard');
}

getAdminBcStats(): Observable<any> {
    return this.http.get<any>('http://localhost:9090/api/admin-bc/stats');
  }

}
