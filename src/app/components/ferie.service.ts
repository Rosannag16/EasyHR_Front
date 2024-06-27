import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ferie } from './ferie';

@Injectable({
  providedIn: 'root'
})
export class FerieService {

  private apiUrl = 'http://localhost:8080/auth'; // Sostituisci con il tuo endpoint API

  constructor(private http: HttpClient) { }

  getFerieByUserId(userId: number): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/request/ferie?userId=${userId}`);
  }

  getAllFerie(): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${this.apiUrl}/request/ferie/all`);
  }

  addFerieRequest(ferie: Ferie): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie`, ferie);
  }

  approveFerieRequest(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie/approve?ferieId=${ferieId}`, null);
  }

  rejectFerieRequest(ferieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/ferie/reject?ferieId=${ferieId}`, null);
  }

  updateFerieStatus(ferieId: number, stato: string): Observable<any> {
    const url = `${this.apiUrl}/request/ferie/updateStatus/${ferieId}`;
    return this.http.put(url, { stato });
  }
}
