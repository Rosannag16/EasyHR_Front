import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../interface/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'; // URL di base per il backend (aggiustare secondo necessità)

  constructor(private http: HttpClient) { }

  // Invia una richiesta POST per aggiornare le ore lavorative di un utente specifico
  updateUserWorkHours(userId: number, updateData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/${userId}/workhours`, updateData);
  }

  // Recupera tutti gli utenti dal backend
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/auth/users`);
  }
}
