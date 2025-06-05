import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceIntern {
  id: number;
  nom: string;
  dateCreation: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiServiceService {
  private apiUrl = 'http://localhost:9090/api/admin-si/services';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceIntern[]> {
    return this.http.get<ServiceIntern[]>(this.apiUrl);
  }

  addService(service: { nom: string }): Observable<any> {
    return this.http.post(this.apiUrl, service, { responseType: 'text' });
  }

 deleteService(id: number): Observable<any> {
  return this.http.delete(`http://localhost:9090/api/admin-si/service/${id}`, {
    responseType: 'text'
  });
}


}
