import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private baseUrl = 'http://localhost:9090/api/delegue/profil';

  constructor(private http: HttpClient) {}

  getPersonalInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/personal-info`);
  }

  updatePersonalInfo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-personal`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, data);
  }

  getPreferences(): Observable<any> {
    return this.http.get(`${this.baseUrl}/preferences`);
  }

  updatePreferences(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-preferences`, data);
  }

  /** ✅ Envoi du formulaire avec FormData (ex : image de profil, pièce jointe, etc.) */
  updateProfilWithFormData(formData: FormData): Observable<string> {
    return this.http.post(`${this.baseUrl}/update-personal`, formData, {
      responseType: 'text' as const
    });
  }
}
