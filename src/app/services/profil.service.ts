import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfilService {
  private baseUrl = 'http://localhost:9090/api/delegue/profil';

  constructor(private http: HttpClient) {}

  getPersonalInfo() {
    return this.http.get<any>(`${this.baseUrl}/personal-info`);
  }

  updatePersonalInfo(dto: any) {
    return this.http.post(`${this.baseUrl}/update-personal`, dto, { responseType: 'text' });
  }

  changePassword(dto: any) {
    return this.http.post(`${this.baseUrl}/change-password`, dto, { responseType: 'text' });
  }

  getPreferences() {
    return this.http.get<any>(`${this.baseUrl}/preferences`);
  }

  updatePreferences(dto: any) {
    return this.http.post(`${this.baseUrl}/update-preferences`, dto, { responseType: 'text' });
  }
}
