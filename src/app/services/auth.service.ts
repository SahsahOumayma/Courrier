import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9090'; // Corrigé : ne pas inclure /auth car tu fais déjà /login, /register...

  constructor(private http: HttpClient) {}

  // ✅ Méthode de connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify?token=${token}`);
  }
  sendSecurityQuestions(token: string, data: any) {
    const params = new HttpParams().set('token', token);
    return this.http.post(`${this.baseUrl}/verify`, data, {
      params,
      responseType: 'text' as const, // 👈 force Angular à ne pas attendre un JSON
    });
  }

  // Envoi email de récupération
  sendRecoveryEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/recover/email`, null, {
      params: new HttpParams().set('email', email),
      responseType: 'text', // pour éviter JSON parse error si backend renvoie une string simple
    });
  }

  // Vérification des questions de sécurité et reset
  resetPasswordByQuestions(email: string, newPassword: string) {
    const params = new URLSearchParams({
      email: email,
      newPassword: newPassword,
    });

    return this.http.post(
      `/recover/reset-password-question?${params.toString()}`,
      {}
    );
  }

  resetPasswordFinal(email: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword);

    return this.http.post(
      `${this.baseUrl}/recover/reset-password-question`,
      null,
      {
        params,
        responseType: 'text',
      }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    const body = { token, newPassword };

    return this.http.post(`${this.baseUrl}/recover/reset-password`, body, {
      responseType: 'text' as const,
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }
  verifySecurityQuestions(payload: any) {
    const params = new URLSearchParams({
      email: payload.email,
      question1: payload.question1,
      answer1: payload.answer1,
      question2: payload.question2,
      answer2: payload.answer2,
      question3: payload.question3,
      answer3: payload.answer3,
    });

    return this.http.post(`/recover/questions?${params.toString()}`, {});
  }
}
