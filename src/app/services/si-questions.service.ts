import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiQuestionsService {
  private baseUrl = 'http://localhost:9090/api/admin-si/question';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

 addQuestion(question: string): Observable<any> {
  const params = new HttpParams().set('question', question);
  return this.http.post(`${this.baseUrl}/ajouter`, null, {
    params,
    observe: 'response',
    responseType: 'text' // important pour gérer la réponse texte
  });
}


  updateQuestion(id: number, nom: string): Observable<any> {
  const params = new HttpParams()
    .set('id', id.toString())
    .set('nom', nom);
  return this.http.put(`${this.baseUrl}/update`, null, {
    params,
    observe: 'response',
    responseType: 'text' // important !
  });
}


deleteQuestion(id: number): Observable<any> {
  const params = new HttpParams().set('id', id.toString());
  return this.http.put(`${this.baseUrl}/delete`, null, {
    params,
    observe: 'response',
    responseType: 'text' // important pour recevoir la réponse texte du backend
  });
}

restoreQuestion(id: number): Observable<any> {
  const params = new HttpParams().set('id', id.toString());
  return this.http.put(`${this.baseUrl}/restore`, null, {
    params,
    observe: 'response',
    responseType: 'text' // idem
  });
}

}
