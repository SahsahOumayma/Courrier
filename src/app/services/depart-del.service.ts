import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartDelService {
  private apiUrl = 'http://localhost:9090/api/delegue/courriers/departs';

  constructor(private http: HttpClient) {}

  getDepartCourriers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:9090/api/delegue/courriers/departs');
  }
}
