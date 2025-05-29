import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090'; // Corrigé : ne pas inclure /auth car tu fais déjà /login, /register...

  constructor(private http: HttpClient) {}

  // ✅ Méthode d'inscription
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // ✅ Méthode de connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // ✅ Vérification email (token envoyé dans l'URL)
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify?token=${token}`);
  }
}
