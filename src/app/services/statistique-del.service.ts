import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueDelService {
  private readonly apiUrl = 'http://localhost:9090/api/delegue/stats';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get<any>('http://localhost:9090/api/delegue/stats');
  }
}
