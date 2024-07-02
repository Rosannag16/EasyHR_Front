import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  nome: string = '';
  cognome: string = '';

  userRegistered: boolean = false; // Flag per indicare se la registrazione è avvenuta con successo
  registrationMessage: string = ''; // Messaggio di conferma o errore durante la registrazione

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    // Creazione dell'oggetto utente con i dati dal form
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      nome: this.nome,
      cognome: this.cognome
    };

    // Chiamata al metodo di registrazione del servizio AuthService
    this.authService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.registrationMessage = response; // Salva il messaggio di conferma dal backend
        this.userRegistered = true; // Indica che l'utente è stato registrato con successo
      },
      error => {
        console.error('Registration failed', error);
        this.registrationMessage = 'Errore durante la registrazione'; // Gestisce l'errore in caso di fallimento della registrazione
        this.userRegistered = false;
      }
    );
  }
}
