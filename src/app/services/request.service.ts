import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ferie } from '../interface/ferie';
import { Permessi } from '../interface/permessi';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8080/auth/request';

  constructor(private http: HttpClient) { }

 
  // Aggiungi una nuova richiesta di ferie
  addFerieRequest(userId: number, dataInizio: string, dataFine: string, motivo: string): Observable<any> {
    const url = `${this.baseUrl}/ferie`;
    const body = { userId, dataInizio, dataFine, motivo };
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Aggiungi una nuova richiesta di permessi
  addPermessiRequest(userId: number, dataInizio: string, dataFine: string, motivo: string): Observable<any> {
    const url = `${this.baseUrl}/permessi`;
    const body = { userId, dataInizio, dataFine, motivo };
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Ottieni tutte le richieste di ferie
  getAllFerieRequests(): Observable<Ferie[]> {
    const url = `${this.baseUrl}/ferie`;
    return this.http.get<Ferie[]>(url).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Ottieni le richieste di ferie per un determinato userId
  getFerieRequestsByUserId(userId: number): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.baseUrl}/ferie?userId=${userId}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Approva una richiesta di ferie specificata
  approveFerieRequest(ferieId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ferie/approve?ferieId=${ferieId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Rifiuta una richiesta di ferie specificata
  rejectFerieRequest(ferieId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ferie/reject?ferieId=${ferieId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Ottieni tutte le richieste di permessi
  getAllPermessiRequests(): Observable<Permessi[]> {
    const url = `${this.baseUrl}/permessi`;
    return this.http.get<Permessi[]>(url).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Ottieni le richieste di permessi per un determinato userId
  getPermessiRequestsByUserId(userId: number): Observable<Permessi[]> {
    return this.http.get<Permessi[]>(`${this.baseUrl}/permessi?userId=${userId}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Approva una richiesta di permessi specificata
  approvePermessiRequest(permessoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/permessi/approve?permessoId=${permessoId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Rifiuta una richiesta di permessi specificata
  rejectPermessiRequest(permessoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/permessi/reject?permessoId=${permessoId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
