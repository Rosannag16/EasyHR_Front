import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './user-dto'; // Assicurati che il percorso sia corretto rispetto alla struttura del tuo progetto Angular

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login'; // Sostituisci con l'URL del tuo backend
  private apiUrl = 'http://localhost:8080/auth'; // Assumi che questo sia il tuo endpoint backend

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }
}
