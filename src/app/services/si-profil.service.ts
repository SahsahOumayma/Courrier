import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SiProfilService {
  private baseUrl = 'http://localhost:9090/api/admin-si/profil'; 

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
