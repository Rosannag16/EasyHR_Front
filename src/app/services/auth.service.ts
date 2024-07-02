import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';  // URL per il punto di accesso di login
  private apiUrl = 'http://localhost:8080/auth';          // URL di base per i punti di accesso dell'API correlati all'autenticazione

  private authData: any;  // Conserva i dati di autenticazione dopo il login riuscito

  constructor(private http: HttpClient) { }

  // Invia una richiesta POST al punto di accesso di login con email e password
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  // Invia una richiesta POST per registrare un nuovo utente
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  // Imposta i dati di autenticazione ricevuti dal server
  setAuthData(authData: any): void {
    this.authData = authData;
  }

  // Verifica se sono disponibili dati di autenticazione
  isAuthenticated(): boolean {
    return !!this.authData;
  }

  // Recupera l'ID dell'utente dai dati di autenticazione
  getUserId(): number {
    if (this.authData && this.authData.id) {
      return this.authData.id;
    } else {
      console.error('Dati di autenticazione non validi.');
      return -1;  // Restituisce -1 se l'ID dell'utente non è disponibile
    }
  }

  // Recupera i permessi dell'utente dai dati di autenticazione
  getUserPermissions(): string[] {
    if (this.authData && this.authData.permissions) {
      return this.authData.permissions;
    } else {
      console.error('Dati di autenticazione non validi o permessi non disponibili.');
      return [];  // Restituisce un array vuoto se i permessi non sono disponibili
    }
  }

  // Invia una richiesta POST per aggiornare le ore lavorative dell'utente
  updateUserWorkHours(userId: number, workHoursData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/workhours`, workHoursData);
  }
}
