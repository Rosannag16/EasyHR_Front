import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router per gestire la navigazione tra le pagine
import { AuthService } from 'src/app/services/auth.service'; // Importa AuthService per gestire l'autenticazione dell'utente

@Component({
  selector: 'app-login', // Selettore del componente
  templateUrl: './login.component.html', // Percorso del file HTML del template del componente
  styleUrls: ['./login.component.css'] // Array di percorsi dei file CSS di stile del componente
})
export class LoginComponent implements OnInit {
  email: string = ''; // Variabile per memorizzare l'email inserita dall'utente
  password: string = ''; // Variabile per memorizzare la password inserita dall'utente
  loginError: string = ''; // Variabile per memorizzare eventuali messaggi di errore di login

  constructor(private authService: AuthService, private router: Router) { } // Inietta AuthService e Router nel costruttore

  ngOnInit(): void {
    // Verifica se l'utente è già autenticato al momento del caricamento del componente
    if (this.authService.isAuthenticated()) {
      this.redirectUser(); // Reindirizza l'utente se è già autenticato
    }
  }

  onSubmit(): void {
    console.log(`onSubmit called with email: ${this.email} and password: ${this.password}`);

    // Chiama il metodo login del AuthService per effettuare il login
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.authService.setAuthData(response.authData); // Imposta i dati di autenticazione nel servizio AuthService

          // Reindirizza l'utente in base alle credenziali
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
