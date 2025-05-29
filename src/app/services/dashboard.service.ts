import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/delegue/dashboard';

  constructor(private http: HttpClient) {}

 getDashboardData(): Observable<any> {
  return this.http.get('http://localhost:9090/api/delegue/dashboard');
}

}
