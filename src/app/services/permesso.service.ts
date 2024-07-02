import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Permessi } from '../interface/permessi';

@Injectable({
  providedIn: 'root'
})
export class PermessoService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  getAllPermessi(): Observable<Permessi[]> {
    return this.http.get<Permessi[]>(`${this.baseUrl}/request/permessi/all`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getPermessiByUserId(userId: number): Observable<Permessi[]> {
    const url = `${this.baseUrl}/request/permessi`;
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Permessi[]>(url, { params }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
  addPermessiRequest(permesso: Permessi): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/permessi`, permesso).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  approvePermessiRequest(permessoId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/permessi/approve?permessoId=${permessoId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  rejectPermessiRequest(permessoId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/permessi/reject?permessoId=${permessoId}`, null).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  updatePermessoStatus(id: number, stato: string): Observable<any> {
    const url = `${this.baseUrl}/updateStatus/${id}`;
    return this.http.put(url, { stato }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          console.error('Errore nella richiesta HTTP:', error);
          return throwError(error);
        })
      );
  }

  getAllPermessis(): Observable<Permessi[]> {
    return this.http.get<Permessi[]>(`${this.baseUrl}/request/permessi/all`);
  }
  
}
