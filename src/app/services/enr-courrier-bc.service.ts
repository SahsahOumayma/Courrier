import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrCourrierBcService {

  constructor(private http: HttpClient) {}

  enregistrerArrivee(data: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.post(
    'http://localhost:9090/api/admin-bc/admin/courriers/arrivee',
    data,
    {
      headers,
      responseType: 'text'
    }
  );
}


  enregistrerDepart(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post(
      'http://localhost:9090/api/admin-bc/admin/courriers/depart',
      formData,
      {
        headers,
        responseType: 'text'
      }
    );
  }

  getServices(): Observable<any> {
    // Appel sans token car endpoint public
    return this.http.get(
      'http://localhost:9090/api/admin-bc/services'
    );
  }
}
