import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  updateUserWorkHours(userId: number, workHours: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}/work-hours`, workHours);
  }
}
