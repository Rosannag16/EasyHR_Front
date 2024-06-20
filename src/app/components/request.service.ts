import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ferie } from './ferie';
import { Permessi } from './permessi';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  addFerieRequest(userId: number, dataInizio: string, dataFine: string, motivo: string): Observable<any> {
    const url = `${this.baseUrl}/ferie`;
    const body = { userId, dataInizio, dataFine, motivo };
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  addPermessiRequest(userId: number, dataInizio: string, dataFine: string, motivo: string): Observable<any> {
    const url = `${this.baseUrl}/permessi`;
    const body = { userId, dataInizio, dataFine, motivo };
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getFerieRequestsByUserId(userId: number): Observable<Ferie[]> {
    const url = `${this.baseUrl}/ferie`;
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Ferie[]>(url, { params }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getPermessiRequestsByUserId(userId: number): Observable<Permessi[]> {
    const url = `${this.baseUrl}/permessi`;
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Permessi[]>(url, { params }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
