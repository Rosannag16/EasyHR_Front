import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Verifica se l'utente è già autenticato al momento del caricamento del componente
    if (this.authService.isAuthenticated()) {
      this.redirectUser();
    }
  }

  onSubmit(): void {
    console.log(`onSubmit called with email: ${this.email} and password: ${this.password}`);

    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.authService.setAuthData(response.authData); // Imposta i dati di autenticazione nel servizio AuthService

          // Reindirizza in base alle credenziali
          this.redirectUser();
        },
        error => {
          console.error('Login failed', error);
          this.loginError = 'Credenziali non valide'; // Mostra un messaggio di errore appropriato
        }
      );
  }

  // Metodo per reindirizzare l'utente in base alle credenziali
  private redirectUser(): void {
    if (this.email === 'admin_user@example.com' && this.password === 'admin1') {
      // Se le credenziali corrispondono all'account specifico, reindirizza a /register
      this.router.navigate(['/register']);
    } else {
      // Altrimenti, reindirizza a /dipendente
      this.router.navigate(['/dipendente']);
    }
  }
}
