import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private apiUrl = 'http://localhost:8080/auth';

  private authData: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  setAuthData(authData: any): void {
    this.authData = authData;
  }

  isAuthenticated(): boolean {
    return !!this.authData;
  }

  getUserId(): number {
    if (this.authData && this.authData.id) {
      return this.authData.id;
    } else {
      console.error('Invalid authentication data.');
      return -1;
    }
  }

  getUserPermissions(): string[] {
    if (this.authData && this.authData.permissions) {
      return this.authData.permissions;
    } else {
      console.error('Invalid authentication data or permissions not available.');
      return [];
    }
  }

  updateUserWorkHours(userId: number, workHoursData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/workhours`, workHoursData);

  }
  
}
