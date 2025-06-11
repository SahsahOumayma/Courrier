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
  resetPasswordByQuestions(
    email: string,
    data: any,
    newPassword: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('question1', data.question1)
      .set('answer1', data.answer1)
      .set('question2', data.question2)
      .set('answer2', data.answer2)
      .set('question3', data.question3)
      .set('answer3', data.answer3);

    return this.http
      .post(`${this.baseUrl}/recover/questions`, null, {
        params,
        responseType: 'text',
      })
      .pipe
      // Si OK, envoyer ensuite le nouveau mot de passe
      // mais ici tu peux le chaîner à part ou manuellement appeler `resetPasswordFinal`
      ();
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

}
