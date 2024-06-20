// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    console.log('onSubmit called with email:', this.email, 'and password:', this.password);
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        if (this.email === 'admin_user@example.com') {
          this.router.navigate(['/register']); // Reindirizza solo l'account admin a /register
        } else {
          this.router.navigate(['/dipendente']); // Reindirizza tutti gli altri a /dipendente
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
