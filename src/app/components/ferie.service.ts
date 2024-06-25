import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ferie } from './ferie'; // Assicurati di definire correttamente il modello Ferie

@Injectable({
  providedIn: 'root'
})
export class FerieService {

  private apiUrl = 'http://api.example.com/ferie'; // Sostituisci con il tuo endpoint API

  constructor(private http: HttpClient) { }

  // Metodo per recuperare le ferie dall'API
  getFerie(): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/dipendenti`);
  }

  // Metodo per approvare una ferie
  approveFerie(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approva/${ferieId}`, null);
  }

  // Metodo per rifiutare una ferie
  rejectFerie(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/rifiuta/${ferieId}`, null);
  }

  // Aggiungi una nuova ferie
  addFerie(ferie: Ferie): Observable<Ferie> {
    return this.http.post<Ferie>(this.apiUrl, ferie);
  }

  // Aggiorna una ferie esistente
  updateFerie(ferie: Ferie): Observable<Ferie> {
    const url = `${this.apiUrl}/${ferie.id}`;
    return this.http.put<Ferie>(url, ferie);
  }

  // Elimina una ferie esistente
  deleteFerie(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('userId');
  }
}
