import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ferie } from '../interface/ferie';

@Injectable({
  providedIn: 'root'
})
export class FerieService {

  private apiUrl = 'http://localhost:8080/auth'; // Sostituisci con il tuo endpoint API

  constructor(private http: HttpClient) { }

  // Recupera tutte le richieste di ferie per un utente specifico tramite userId
  getFerieByUserId(userId: number): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/request/ferie?userId=${userId}`);
  }

  // Recupera tutte le richieste di ferie per tutti gli utenti
  getAllFerie(): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/request/ferie/all`);
  }

  // Aggiunge una nuova richiesta di ferie
  addFerieRequest(ferie: Ferie): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie`, ferie);
  }

  // Approva una richiesta di ferie tramite il suo ferieId
  approveFerieRequest(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie/approve?ferieId=${ferieId}`, null);
  }

  // Rifiuta una richiesta di ferie tramite il suo ferieId
  rejectFerieRequest(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie/reject?ferieId=${ferieId}`, null);
  }

  // Aggiorna lo stato di una richiesta di ferie tramite il suo ferieId
  updateFerieStatus(ferieId: number, stato: string): Observable<any> {
    const url = `${this.apiUrl}/request/ferie/updateStatus/${ferieId}`;
    return this.http.put(url, { stato });
  }

  // Recupera tutte le richieste di ferie (nome del metodo alternativo, potrebbe essere duplicato)
  getAllFeries(): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/request/ferie/all`);
  }
}
