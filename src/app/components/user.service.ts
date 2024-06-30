import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'; // Aggiusta la base URL secondo il tuo backend

  constructor(private http: HttpClient) { }

  updateUserWorkHours(userId: number, updateData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/${userId}/workhours`, updateData);
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/auth/users`);
  }
}
